import { askBooleanQuestion, askQuestion, runCommand } from './lib/helpers';

const cp = require('child_process');
const fs = require('fs');

export class OptionalPackages {
    config = {
        prompt: 'Use a yaml config file?',
        enabled: true,
        default: false,
        dependsOn: [],
        name: 'conf',
        add: () => {
            cp.execSync('npm install conf js-yaml', { cwd: __dirname, stdio: 'inherit' });
            fs.writeFileSync(`${__dirname}/config.yaml`, '', { encoding: 'utf-8' });

            fs.writeFileSync(
                `${__dirname}/src/config.ts`,
                `
                 import Conf from 'conf';
                 import yaml from 'js-yaml';

                 const ConfBaseConfig = {
                     cwd: __dirname,
                     deserialize: (text: string) => yaml.load(text),
                     serialize: value => yaml.dump(value, { indent: 2 }),
                     fileExtension: 'yml',
                 };

                 export function createConf(name: string, options: Record<string, any> = {}): Conf {
                     return new Conf(<any>{
                         configName: name,
                         ...Object.assign({}, ConfBaseConfig, options),
                     });
                 }
             `.trim(),
                { encoding: 'utf-8' },
            );
        },
    };

    dotenv = {
        prompt: 'Use a .env file?',
        enabled: true,
        default: false,
        dependsOn: [],
        name: 'dotenv',
        add: () => {
            runCommand('npm install dotenv');

            fs.mkdirSync(`${__dirname}/dist`, { recursive: true });
            fs.writeFileSync(`${__dirname}/dist/.env`, 'TEST_VALUE=1\n', { encoding: 'utf-8' });
            fs.writeFileSync(
                `${__dirname}/src/init.ts`,
                `
                 require('dotenv').config({ path: \`\${__dirname}/.env' })
             `.trim(),
                { encoding: 'utf-8' },
            );
        },
    };

    otherPackages = {
        prompt: 'Comma-separated list of packages to install:',
        enabled: true,
        default: '',
        dependsOn: [],
        name: 'otherPackages',
        add: values => {
            cp.execSync('npm install ' + values.join(' '), { cwd: __dirname, stdio: 'inherit' });
        },
    };

    optionalPackages = [ this.config, this.dotenv ];

    async run() {
        for (const pkg of this.optionalPackages) {
            const result = await askBooleanQuestion(pkg.prompt);
            if (result) {
                pkg.add();
            }
        }

        const packageList: any = await askQuestion(this.otherPackages, this.otherPackages.default);

        if (packageList.length > 0) {
            this.otherPackages.add(packageList.split(',').map(pkg => pkg.trim()));
        }

        cp.execSync('node ./node_modules/.bin/prettier --write ./src', { cwd: __dirname, stdio: 'inherit' });
        cp.execSync('node ./node_modules/.bin/eslint --fix ./src', { cwd: __dirname, stdio: 'inherit' });
    }
}
