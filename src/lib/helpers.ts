const cp = require('child_process');
const fs = require('fs');
const util = require('util');
import { createHash } from 'crypto';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';

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

export const installDependencies = (cwd = __dirname) => {
    cp.execSync('npm install', { cwd, encoding: 'utf-8', stdio: 'inherit' });
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

export const askQuestion = async (prompt, defaultValue = ''): Promise<string | any> => {
    let result: any = '';

    try {
        result = await question(`${prompt} ${defaultValue.length ? '(' + defaultValue + ') ' : ''}`);
    } catch (err) {
        result = defaultValue;
    }

    return new Promise(resolve => {
        if (!result || result.trim().length === 0) {
            result = defaultValue;
        }

        resolve(result);
    });
};

/**
 * Determines if `value` is a boolean string.
 * @param {string|undefined} value
 * @param param1
 * @returns {boolean}
 */
//@ts-ignore
export function yn(value: any, { default: default_ } = {}): boolean {
    if (default_ !== undefined && typeof default_ !== 'boolean') {
        throw new TypeError(`Expected the \`default\` option to be of type \`boolean\`, got \`${typeof default_}\``);
    }

    if (value === undefined || value === null) {
        return default_;
    }

    value = String(value).trim();

    if (/^(?:y|ye|yes|true|1|on)$/i.test(value)) {
        return true;
    }

    if (/^(?:n|no|false|0|off)$/i.test(value)) {
        return false;
    }

    return default_;
}

export const askBooleanQuestion = async (str: string, defaultValue = false): Promise<boolean> => {
    const resultStr: string = await askQuestion(`${str} `);

    return yn(resultStr, { default: defaultValue });
};

export const booleanToString = (value: boolean) => {
    return value ? 'true' : 'false';
};

export const isObject = value => {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
};

export function getPathSegments(path) {
    return path.split('.');
}

export function isStringIndex(object, key) {
    if (typeof key !== 'number' && Array.isArray(object)) {
        const index = Number.parseInt(key, 10);
        return Number.isInteger(index) && object[index] === object[key];
    }

    return false;
}

export function dotget(object, path: string, value: any = undefined) {
    if (!isObject(object) || typeof path !== 'string') {
        return value === undefined ? object : value;
    }

    const pathArray = getPathSegments(path);
    if (pathArray.length === 0) {
        return value;
    }

    for (let index = 0; index < pathArray.length; index++) {
        const key = pathArray[index];

        if (isStringIndex(object, key)) {
            object = index === pathArray.length - 1 ? undefined : null;
        } else {
            object = object[key];
        }

        if (object === undefined || object === null) {
            if (index !== pathArray.length - 1) {
                return value;
            }

            break;
        }
    }

    return object === undefined ? value : object;
}

export function dotset(object: Record<string, any>, path: string, value: any) {
    const assertNotStringIndex = (object, key) => {
        if (isStringIndex(object, key)) {
            throw new Error('Cannot use string index');
        }
    };

    const root = object;
    const pathArray = getPathSegments(path);

    for (let index = 0; index < pathArray.length; index++) {
        const key = pathArray[index];

        assertNotStringIndex(object, key);

        if (index === pathArray.length - 1) {
            object[key] = value;
        } else if (!isObject(object[key])) {
            object[key] = typeof pathArray[index + 1] === 'number' ? [] : {};
        }

        object = object[key];
    }

    return root;
}

export function isEmpty(value: any): boolean {
    return [undefined, null, ''].includes(value);
}

export const readfile = (filename: string) => readFileSync(filename, { encoding: 'utf-8' });
export const writefile = (filename: string, contents: string) => writeFileSync(filename, contents, { encoding: 'utf-8' });
export const replaceFileString = (filename: string, search: string, replacement: string) => {
    const contents = readfile(filename);
    const newContents = contents.replace(search, replacement);
    writefile(filename, newContents);
};

export const safeUnlink = (path: string) => existsSync(path) && is_file(path) && unlinkSync(path);
export const githubWorkflowFilename = name => `${__dirname}/.github/workflows/${name}.yml`;
export const githubConfigFilename = name => `${__dirname}/.github/${name}.yml`;

export const hashString = (str: string) => {
    return createHash('sha256', { encoding: 'utf-8' }).update(str).digest('hex');
};
