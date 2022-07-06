const { readFileSync, writeFileSync } = require('fs');

export class FileVariableReplacer {
    static execute(filename, packageInfo) {
        let content = readFileSync(filename, { encoding: 'utf-8' }).toString();
        const originalContent = content.slice();

        const thisYear = new Date().getFullYear().toString();

        content = content
            .replace(/package-skeleton/g, packageInfo.name)
            .replace(/\{\{vendor\.name\}\}/g, packageInfo.vendor.name)
            .replace(/\{\{vendor\.github\}\}/g, packageInfo.vendor.github)
            .replace(/\{\{package\.name\}\}/g, packageInfo.name)
            .replace(/\{\{package\.description\}\}/g, packageInfo.description)
            .replace(/\{\{package\.author\.name\}\}/g, packageInfo.author.name)
            .replace(/\{\{package\.author\.email\}\}/g, packageInfo.author.email)
            .replace(/\{\{package\.author\.github\}\}/g, packageInfo.author.github)
            .replace(/\{\{date\.year\}\}/g, thisYear)
            .replace('Template Setup: run `node configure-package.js` to configure.\n', '');

        if (originalContent !== content) {
            writeFileSync(filename, content, { encoding: 'utf-8' });
        }
    }
}
