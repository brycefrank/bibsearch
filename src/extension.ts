'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const bibtex_parser = require('bibtex-parser');
import fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Parse a bib
    var bib_path = "/home/bryce/Work_Sync/Resources/library.bib";
    var bib_str = fs.readFileSync(bib_path, 'utf8');
    var parsed_bib = bibtex_parser(bib_str);

    // Get all authors
    var title_arr:string[] = []
    for (var key in parsed_bib) {
        if (parsed_bib.hasOwnProperty(key)) {
            title_arr.push(parsed_bib[key]["TITLE"]);
        }
    }
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user

        vscode.window.showQuickPick(
            title_arr,
            {
                placeHolder: 'Enter article name',
                ignoreFocusOut: true,
                matchOnDescription: true,
                matchOnDetail: true
            }
    )});

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}