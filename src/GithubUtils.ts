import { GithubApiClient } from './GithubApiClient';

export class GithubUtils {
    static async getRepositoryDescription(owner, name) {
        return (await GithubApiClient.create().repository(owner, name))?.description ?? '';
    }

    static configFilename = name => `${__dirname}/.github/${name}.yml`;
    static workflowFilename = name => `${__dirname}/.github/workflows/${name}.yml`;
}
