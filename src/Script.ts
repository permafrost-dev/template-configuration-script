import { createPackageInfo, PackageInfo } from '@/lib/PackageInfo';
import { hashString, installDependencies, runCommand, safeUnlink } from '@/lib/helpers';
import { DirectoryProcessor } from '@/lib/filesystem/DirectoryProcessor';
import { EventUtils } from '@/utils/EventUtils';
import { GitUtils } from '@/utils/GitUtils';
import { Prompts } from '@/lib/Prompts';
import readline from 'readline';
import { Repository } from '@/lib/Repository';
import { getUrl } from '@/utils/HttpUtils';
import { readFileSync, writeFileSync } from 'fs';

export class Script {
    public rl: readline.Interface;
    public pkg: PackageInfo = createPackageInfo();
    public prompts: Prompts;
    public repository: Repository;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.prompts = new Prompts(this.rl);
        this.repository = new Repository();
    }

    destroy() {
        this.rl.close();
    }

    async initPackageInfo() {
        const authorUsername = await new EventUtils().searchRepositoryCommitsForGithubUsername(
            GitUtils.githubUser,
            GitUtils.githubRepositoryName(),
            GitUtils.email(),
            GitUtils.username(),
        );

        this.pkg = createPackageInfo();
        this.pkg.name = this.repository.name;
        this.pkg.description = await this.repository.getDescription();
        this.pkg.author.name = GitUtils.username();
        this.pkg.author.email = GitUtils.email();
        this.pkg.author.github = authorUsername ?? this.repository.owner;
        this.pkg.vendor.name = await GitUtils.githubOwnerName();
        this.pkg.vendor.github = this.repository.owner;
    }

    async populatePackageInfo() {
        const prompts = [
            { path: 'name', prompt: 'package name?' },
            { path: 'description', prompt: 'package description?' },
            { path: 'author.name', prompt: 'author name?' },
            { path: 'author.email', prompt: 'author email?' },
            { path: 'author.github', prompt: 'author github username?' },
            { path: 'vendor.name', prompt: 'vendor name?' },
            { path: 'vendor.github', prompt: 'vendor github org/username?' },
        ];

        for (const prompt of prompts) {
            await this.prompts.conditional(this.pkg, prompt.path, prompt.prompt);
        }
    }

    checkIfUpdateIsNeeded(downloadedHash: string) {
        const currentHash = hashString(readFileSync(__filename, { encoding: 'utf-8' }));

        console.log({ currentHash, downloadedHash });

        return currentHash !== downloadedHash;
    }

    async updateWithLatestVersionFromGithub() {
        const baseUrl = `https://raw.githubusercontent.com/permafrost-dev/template-configuration-script/main/dist`;
        const hashResp = await getUrl(`${baseUrl}/configure-template.js.hash`);

        if (hashResp.success) {
            const needsUpdate = this.checkIfUpdateIsNeeded(hashResp.data);

            if (needsUpdate) {
                const scriptResp = await getUrl(`${baseUrl}/configure-template.js`);

                if (scriptResp.success) {
                    writeFileSync(`${__filename}`, scriptResp.data, { encoding: 'utf-8' });
                    console.log('* Updated to the latest version, please re-run this script.');
                    process.exit(0);
                }
            }
        }
    }

    async run() {
        await this.updateWithLatestVersionFromGithub();

        console.log('Retrieving github data...');

        await this.initPackageInfo();
        await this.populatePackageInfo();
        await this.confirmRunOrExit();

        if (await this.processRepositoryFiles()) {
            this.installDependencies();
        }

        this.destroy();
        this.unlink();
        this.commitChanges();
    }

    async confirmRunOrExit() {
        const confirm = await this.prompts.boolean('Process files (will modify files)? ', false);

        if (!confirm) {
            console.log('Not processing files. Exiting script.');
            this.destroy();
            process.exit(1);
        }
    }

    async processRepositoryFiles() {
        try {
            DirectoryProcessor.execute(this.repository.path, this.repository.path, this.pkg);
            return true;
        } catch (err: any) {
            console.log(err.message);
            return false;
        }
    }

    installDependencies() {
        console.log('Installing dependencies...');
        installDependencies(this.repository.path);
    }

    unlink() {
        try {
            console.log('Done, removing this script.');
            safeUnlink(__filename);
        } catch (err: any) {
            console.log(err.message);
        }
    }

    commitChanges() {
        try {
            console.log('Committing changes...');
            runCommand('git add .');
            runCommand('git commit -m"initial commit"');
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
