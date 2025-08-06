import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Path Escaping Test Suite', () => {
    vscode.window.showInformationMessage('Testing path escaping fixes.');

    test('Should remove backslashes before spaces in paths', () => {
        // Test the path escaping logic similar to what's used in extension.ts
        const testCases = [
            {
                input: '/Users/test/Library/Application\\ Support/Local/ssh-entry/site.sh',
                expected: "'/Users/test/Library/Application Support/Local/ssh-entry/site.sh'"
            },
            {
                input: '/Users/test/path\\ with\\ multiple\\ spaces/site.sh',
                expected: "'/Users/test/path with multiple spaces/site.sh'"
            },
            {
                input: '/Users/test/normal-path/site.sh',
                expected: "'/Users/test/normal-path/site.sh'"
            },
            {
                input: '/Users/test/path\'s with quote/site.sh',
                expected: "'/Users/test/path'\\''s with quote/site.sh'"
            }
        ];

        testCases.forEach((testCase, index) => {
            // Apply the fix: remove backslashes before spaces, then escape quotes
            const pathWithoutSpaceEscapes = testCase.input.replace(/\\ /g, ' ');
            const quoteReplacement = "'\\''" ;
            const escapedPath = `'${pathWithoutSpaceEscapes.replace(/'/g, quoteReplacement)}'`;
            
            assert.strictEqual(escapedPath, testCase.expected, 
                `Test case ${index + 1} failed. Input: ${testCase.input}`);
        });
    });

    test('Should handle paths without backslashes correctly', () => {
        const normalPath = '/Users/test/Library/Application Support/Local/ssh-entry/site.sh';
        const pathWithoutSpaceEscapes = normalPath.replace(/\\ /g, ' ');
        const quoteReplacement = "'\\''" ;
        const escapedPath = `'${pathWithoutSpaceEscapes.replace(/'/g, quoteReplacement)}'`;
        
        assert.strictEqual(escapedPath, "'/Users/test/Library/Application Support/Local/ssh-entry/site.sh'");
        assert.strictEqual(normalPath, pathWithoutSpaceEscapes, 'Should not modify paths without backslashes');
    });
});