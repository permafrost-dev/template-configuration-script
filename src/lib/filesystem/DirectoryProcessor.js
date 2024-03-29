import { is_dir, is_file } from '@/lib/helpers';
import { FileVariableReplacer } from '@/lib/filesystem/FileVariableReplacer';

const path = require('path');
const fs = require('fs');

export class DirectoryProcessor {
    static execute(basePath, directory, packageInfo) {
        const files = fs.readdirSync(directory).filter(f => {
            return ![
                '.',
                '..',
                '.editorconfig',
                '.eslintignore',
                '.git',
                '.gitattributes',
                '.gitignore',
                '.prettierignore',
                'configure-package.js',
                path.basename(__filename),
                'dist',
                'node_modules',
                'package-lock.json',
            ].includes(path.basename(f));
        });

        files.forEach(fn => {
            const fqName = `${directory}/${fn}`;
            const relativeName = fqName.replace(basePath + '/', '');
            const isPath = is_dir(fqName);
            const kind = isPath ? 'directory' : 'file';

            console.log(`processing ${kind} ./${relativeName}`);

            if (isPath) {
                DirectoryProcessor.execute(basePath, fqName, packageInfo);
                return;
            }

            if (is_file(fqName)) {
                try {
                    FileVariableReplacer.execute(fqName, packageInfo);
                } catch (err) {
                    console.log(`Error processing file ${relativeName}`);
                }
            }
        });
    }
}
