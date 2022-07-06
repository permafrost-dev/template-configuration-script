/* eslint-disable no-unused-vars */

/**
 * configures a package created from the template.
 * ---
 */

import { askQuestion, gitCommand, initReadlineQuestionPromise, installDependencies, runCommand } from './helpers';

import { OptionalFeatures } from './Features';
import { OptionalPackages } from './OptionalPackages';
import { packageInfo } from './PackageInfo';
import { DirectoryProcessor } from './DirectoryProcessor';

const fs = require('fs');
const readline = require('readline');
const { basename } = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

initReadlineQuestionPromise(rl);

const conditionalAsk = async (obj, propName, onlyEmpty, prompt, allowEmpty = false, alwaysAsk = true) => {
    const value = obj[propName];

    if (!onlyEmpty || !value.length || alwaysAsk) {
        while (obj[propName].length === 0 || alwaysAsk) {
            obj[propName] = await askQuestion(prompt, value);

            if (allowEmpty && obj[propName].length === 0) {
                break;
            }

            if (obj[propName].length > 0) {
                break;
            }
        }
    }

    return new Promise(resolve => resolve(true));
};

const populatePackageInfo = async (onlyEmpty = false) => {
    const remoteUrlParts = gitCommand('config remote.origin.url').trim().replace(':', '/').split('/');

    console.log();

    packageInfo.name = basename(__dirname);
    packageInfo.author.name = gitCommand('config user.name').trim();
    packageInfo.author.email = gitCommand('config user.email').trim();
    packageInfo.vendor.name = packageInfo.author.name;
    packageInfo.author.github = remoteUrlParts[1];
    packageInfo.vendor.github = remoteUrlParts[1];

    await conditionalAsk(packageInfo, 'name', onlyEmpty, 'package name?', false);
    await conditionalAsk(packageInfo, 'description', onlyEmpty, 'package description?');
    await conditionalAsk(packageInfo.author, 'name', onlyEmpty, 'author name?');
    await conditionalAsk(packageInfo.author, 'email', onlyEmpty, 'author email?');
    await conditionalAsk(packageInfo.author, 'github', onlyEmpty, 'author github username?');
    await conditionalAsk(packageInfo.vendor, 'name', onlyEmpty, 'vendor name (default is author name)?', true);
    await conditionalAsk(packageInfo.vendor, 'github', onlyEmpty, 'vendor github org/user name (default is author github)?', true);

    if (packageInfo.vendor.name.length === 0) {
        packageInfo.vendor.name = packageInfo.author.name;
    }

    if (packageInfo.vendor.github.length === 0) {
        packageInfo.vendor.github = packageInfo.author.github;
    }
};

const run = async function () {
    await populatePackageInfo();
    await new OptionalFeatures().run();

    const confirm = (await askQuestion('Process files (this will modify files)? '))
        .toString()
        .toLowerCase()
        .replace(/ /g, '')
        .replace(/[^yn]/g, '')
        .slice(0, 1);

    if (confirm !== 'y') {
        console.log('Not processing files: action canceled.  Exiting.');
        rl.close();
        return;
    }

    try {
        DirectoryProcessor.execute(__dirname, packageInfo);
        installDependencies();
        await new OptionalPackages().run();
    } catch (err) {
        //
    }

    rl.close();

    try {
        console.log('Done, removing this script.');
        if (fs.existsSync(__filename)) {
            fs.unlinkSync(__filename);
        }
    } catch (err) {
        //
    }

    try {
        runCommand('git add .');
        runCommand('git commit -m"commit configured package files"');
    } catch (err) {
        // @ts-ignore
        console.log(err.message);
    }
};

run();
