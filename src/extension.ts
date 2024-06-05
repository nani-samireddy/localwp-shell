import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration();
  const folderPathConfig = config.get("localWPShells.folderPath") as string;

  if (!folderPathConfig) {
    const homeDir = os.homedir();
    const defaultPath = path.join(
      homeDir,
      "Library/Application Support/Local/ssh-entry"
    );
    config.update(
      "localWPShells.folderPath",
      defaultPath,
      vscode.ConfigurationTarget.Global
    );
  }

  let disposable = vscode.commands.registerCommand(
    "localwp-shells.listSites",
    async () => {
      const folderPath = vscode.workspace
        .getConfiguration()
        .get("localWPShells.folderPath") as string;

      if (!folderPath) {
        vscode.window.showErrorMessage(
          "Please set the folderPath in the settings."
        );
        return;
      }

      try {
        const files = await fs.promises.readdir(folderPath);
        const shFiles = files.filter((file) => file.endsWith(".sh"));

        if (shFiles.length === 0) {
          vscode.window.showInformationMessage(
            "No site shells found in the given path."
          );
          return;
        }

        const items = await Promise.all(
          shFiles.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const label = await getLabelFromFile(filePath);
            return { label, description: filePath };
          })
        );

        const selected = await vscode.window.showQuickPick(items, {
          placeHolder: "Select a script to run",
        });

        if (selected) {
          const terminal = vscode.window.createTerminal(
            `Run ${selected.label}`
          );
          const escapedPath = `'${selected.description.replace(
            /'/g,
            "'\\''"
          )}'`;
          terminal.sendText(`sh ${escapedPath}`);
          terminal.show();

          // Display a message to the user to inform that site shell is opened.
          vscode.window.showInformationMessage(
            `Site shell for ${selected.label} is opened in the Terminal.`
          );
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(
          `Error reading folder: ${error.message}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function getLabelFromFile(filePath: string): Promise<string> {
  try {
    const content = await fs.promises.readFile(filePath, "utf8");
    const lines = content.split("\n");
    for (const line of lines) {
      if (line.startsWith("cd ")) {
        const match = line.match(/cd\s+"?([^"]+?)\/app\/public"?/);
        if (match && match[1]) {
          const parts = match[1].split("/");
          return parts[parts.length - 1]; // Extract the word before "/app/public"
        }
      }
    }
    return path.basename(filePath); // Fallback to filename if no match found
  } catch (error: any) {
    vscode.window.showErrorMessage(
      `Error reading file ${filePath}: ${error.message}`
    );
    return path.basename(filePath);
  }
}

export function deactivate() {}
