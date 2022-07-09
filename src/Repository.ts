import { GithubUtils } from './GithubUtils';
import { GitUtils } from './GitUtils';

export class Repository {
    public name: string;
    public owner: string;
    public path: string;

    constructor() {
        this.path = GitUtils.topLevelPath();
        this.owner = GitUtils.githubUser;
        this.name = GitUtils.githubRepositoryName();
    }

    workflowFile(name: string) {
        return this.githubFile(`workflows/${name}`);
    }

    githubFile(name: string) {
        return `${this.path}/.github/${name}.yml`;
    }

    async getDescription() {
        return await GithubUtils.getRepositoryDescription(this.owner, this.name);
    }
}
