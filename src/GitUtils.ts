import { gitCommand } from '@/helpers';
import { GithubApiClient } from '@/GithubApiClient';

export enum GithubUserType {
    Bot = 'Bot',
    Organization = 'Organization',
    Unknown = 'Unknown',
    User = 'User',
}

export class GitUtils {
    static get githubUser(): string {
        return gitCommand('config remote.origin.url').trim()
            .replace(':', '/')
            .split('/')[1];
    }

    static async githubOwnerName() {
        const client = new GithubApiClient();
        const data = await client.user(GitUtils.githubUser);

        if (!data) {
            return GitUtils.username();
        }

        return data.name;
    }

    static async githubOwnerType(): Promise<GithubUserType> {
        const client = new GithubApiClient();
        const data = await client.user(this.githubUser);

        if (!data) {
            return GithubUserType.Unknown;
        }

        return <GithubUserType>data.type;
    }

    static githubRepositoryName() {
        return gitCommand('config remote.origin.url')
            .trim()
            .replace(':', '/')
            .split('/')
            .pop()
            .replace(/\.git$/, '');
    }

    static username() {
        return gitCommand('config user.name').trim();
    }

    static email() {
        return gitCommand('config user.email').trim();
    }

    static topLevelPath() {
        return gitCommand('rev-parse --show-toplevel').trim();
    }
}
