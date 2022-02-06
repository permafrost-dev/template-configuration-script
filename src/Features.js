import { runCommand, askBooleanQuestion } from './helpers';

const fs = require('fs');

const safeUnlink = path => fs.existsSync(path) && fs.unlinkSync(path);
const getWorkflowFilename = name => `${__dirname}/.github/workflows/${name}.yml`;
const getGithubConfigFilename = name => `${__dirname}/.github/${name}.yml`;

export class OptionalFeatures {
    codecov = {
        prompt: 'Use code coverage service codecov?',
        enabled: true,
        dependsOn: [],
        disable: () => {
            const testsWorkflowFn = getWorkflowFilename('run-tests');
            const contents = fs.readFileSync(testsWorkflowFn, { encoding: 'utf-8' });

            fs.writeFileSync(testsWorkflowFn, contents.replace('USE_CODECOV_SERVICE: yes', 'USE_CODECOV_SERVICE: no'), {
                encoding: 'utf-8',
            });
            safeUnlink(getGithubConfigFilename('codecov'));
        },
    };

    dependabot = {
        prompt: 'Use Dependabot?',
        enabled: true,
        dependsOn: [],
        disable: () => {
            safeUnlink(getGithubConfigFilename('dependabot'));
            this.automerge.disable();
        },
    };

    automerge = {
        prompt: 'Automerge Dependabot PRs?',
        enabled: true,
        dependsOn: ['dependabot'],
        disable: () => {
            safeUnlink(getWorkflowFilename('dependabot-auto-merge'));
        },
    };

    codeql = {
        prompt: 'Use CodeQL Quality Analysis?',
        enabled: true,
        dependsOn: [],
        disable: () => {
            safeUnlink(getWorkflowFilename('codeql-analysis'));
        },
    };

    updateChangelog = {
        prompt: 'Use Changelog Updater Workflow?',
        enabled: true,
        dependsOn: [],
        disable: () => {
            safeUnlink(getWorkflowFilename('update-changelog'));
        },
    };

    useMadgePackage = {
        prompt: 'Use madge package for code analysis?',
        enabled: true,
        dependsOn: [],
        disable: () => {
            runCommand('npm rm madge');
            safeUnlink(`${__dirname}/.madgerc`);

            const pkg = require(`${__dirname}/package.json`);

            delete pkg.scripts['analyze:deps:circular'];
            delete pkg.scripts['analyze:deps:list'];
            delete pkg.scripts['analyze:deps:graph'];

            fs.writeFileSync(`${__dirname}/package.json`, JSON.stringify(pkg, null, 4), { encoding: 'utf-8' });
        },
    };

    features = [this.codecov, this.dependabot, this.automerge, this.codeql, this.updateChangelog, this.useMadgePackage];

    async run() {
        for (let feature of this.features) {
            if (feature.enabled) {
                feature.enabled = await askBooleanQuestion(feature.prompt, feature.default);
            }

            if (!feature.enabled) {
                feature.disable();
            }
        }
    }
}
