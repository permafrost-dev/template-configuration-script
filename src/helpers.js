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
    return cp.execSync(`git ${command}`, { env: process.env, cwd: __dirname, encoding: 'utf-8', stdio: 'pipe' }) || '';
};

export const installDependencies = () => {
    cp.execSync('npm install', { cwd: __dirname, encoding: 'utf-8', stdio: 'inherit' });
};

export function rescue(func, defaultValue = null) {
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

export function dedent(templ, ...values) {
    let strings = Array.from(typeof templ === 'string' ? [templ] : templ);
    strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, '');
    const indentLengths = strings.reduce((arr, str) => {
        const matches = str.match(/\n([\t ]+|(?!\s).)/g);
        if (matches) {
            return arr.concat(
                matches.map(match => {
                    var _a;
                    return ((_a = match.match(/[\t ]/g)) == null ? void 0 : _a.length) ?? 0;
                }),
            );
        }
        return arr;
    }, []);
    if (indentLengths.length) {
        const pattern = new RegExp(`[	 ]{${Math.min(...indentLengths)}}`, 'g');
        strings = strings.map(str => str.replace(pattern, '\n'));
    }
    strings[0] = strings[0].replace(/^\r?\n/, '');
    let string = strings[0];
    values.forEach((value, i) => {
        const endentations = string.match(/(?:^|\n)( *)$/);
        const endentation = endentations ? endentations[1] : '';
        let indentedValue = value;
        if (typeof value === 'string' && value.includes('\n')) {
            indentedValue = String(value)
                .split('\n')
                .map((str, i2) => (i2 === 0 ? str : `${endentation}${str}`))
                .join('\n');
        }
        string += indentedValue + strings[i + 1];
    });
    return string;
}

export const askQuestion = async (prompt, defaultValue = '') => {
    let result = '';

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
    const resultStr = await askQuestion(`${str} `);
    const result = resultStr.toString().toLowerCase()
        .replace(/ /g, '')
        .replace(/[^yn]/g, '')
        .slice(0, 1);

    return result === 'y';
};
