const cp = require('child_process');
const fs = require('fs');
const util = require('util');

let question;

export const initReadlineQuestionPromise = rl => {
    question = util.promisify(rl.question).bind(rl);
};

export const runCommand = str => {
    cp.execSync(str, { cwd: __dirname, encoding: 'utf-8', stdio: 'inherit' });
};

export const gitCommand = command => {
    return (
        cp.execSync(`git ${command}`, {
            env: process.env,
            cwd: __dirname,
            encoding: 'utf-8',
            stdio: 'pipe',
        }) || ''
    );
};

export const installDependencies = () => {
    cp.execSync('npm install', { cwd: __dirname, encoding: 'utf-8', stdio: 'inherit' });
};

export function rescue(func, defaultValue: any = null) {
    try {
        return func();
    } catch (e) {
        return defaultValue;
    }
}

export function is_dir(path) {
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

export function is_symlink(path) {
    return rescue(() => fs.lstatSync(path).isSymbolicLink(), false);
}

export function is_file(path) {
    return rescue(() => fs.lstatSync(path).isFile(), false);
}

export const askQuestion = async (prompt, defaultValue = ''): Promise<any> => {
    let result: any = '';

    try {
        result = await question(`${prompt} ${defaultValue.length ? '(' + defaultValue + ') ' : ''}`);
    } catch (err) {
        result = false;
    }

    return new Promise(resolve => {
        if (!result || result.trim().length === 0) {
            result = defaultValue;
        }

        resolve(result);
    });
};

export const askBooleanQuestion = async str => {
    const resultStr: any = await askQuestion(`${str} `);
    const result = resultStr.toString().toLowerCase().replace(/ /g, '').replace(/[^yn]/g, '').slice(0, 1);

    return result === 'y';
};
