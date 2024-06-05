# LocalWP Shells VSCode Extension

**LocalWP Shells** is a Visual Studio Code (VSCode) extension that simplifies the process of opening LocalWP site shells directly within the VSCode editor environment. This extension is designed to enhance the workflow of developers working with LocalWP by providing quick access to site shells without leaving the editor.

## Features

- **List Sites**: Easily list all available site shells within your specified folder path.
- **Quick Pick Selection**: Select a script to run from the listed site shells.
- **Terminal Integration**: Opens the selected site shell in a new terminal window within VSCode.

## Installation

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/nani-samireddy/localwp-shell
   ```
2. Open Visual Studio Code.
3. Open the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
4. Click on the "Open Extensions" icon (square with arrows) and select "Install from VSIX...".
5. Navigate to the cloned repository folder and select the `.vsix` file to install the extension.
6. Once installed, the extension is ready to use.

## Usage

1. Configure the folder path where your LocalWP site shells are located in VSCode settings (`localWPShells.folderPath`).
2. Open the command palette (Ctrl/Cmd + Shift + P) and search for "Local WP: List Sites" or use the shortcut provided by the extension.
3. Select a site shell script from the listed options.
4. The selected site shell will open in a new terminal window within VSCode.

## Configuration

The extension provides a configuration option to set the folder path where your LocalWP site shells are stored. This can be done by updating the `localWPShells.folderPath` setting in VSCode settings.

## Development

### Prerequisites

- Node.js (recommended version)
- Visual Studio Code

### Getting Started

1. Clone this repository.
   ```bash
   git clone https://github.com/nani-samireddy/localwp-shell
   ```
2. Navigate to the cloned repository folder.
   ```bash
   cd localwp-shells
   ```
3. Install dependencies.
   ```bash
   npm install
   ```
4. Open the project in Visual Studio Code.
   ```bash
   code .
   ```
5. Make your changes and test the extension locally.

### Debugging

To debug the extension:

1. Open the project in Visual Studio Code.
2. Press `F5` or go to the "Run" menu and click "Start Debugging".

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository. Pull requests are also appreciated.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using LocalWP Shells VSCode Extension! Happy coding! 🚀
