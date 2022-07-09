import { getJson, RestApiResponse } from '@/utils/HttpUtils';
import { Event } from '@/utils/EventUtils';

export interface Contributor {
    login: string;
    type: string;
    contributions: number;
}

export interface GithubUser {
    login: string;
    avatar_url: string;
    type: string;
    name: string;
    company: any;
    blog: any;
    location: any;
    email: any;
    hireable: any;
    bio: any;
    twitter_username: any;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export class GithubApiClient {
    static create(): GithubApiClient {
        return new GithubApiClient();
    }

    async get(endpoint: string): Promise<RestApiResponse> {
        return await getJson(`https://api.github.com/${endpoint.replace(/^\/+/, '')}`);
    }

    async org(name: string) {
        const response = await this.get(`/orgs/${name}`);
        return response.data;
    }

    async searchUsers(query: string, minScore = 1.0) {
        const response = await this.get(`/search/users?q=${query}`);
        if (!response.data) {
            return response.data;
        }

        if (response.data.total_count === 0) {
            return null;
        }

        return response.data.items.filter(item => item.score >= minScore);
    }

    /**
     * Return a list of contributors for a given repository.
     * @param {string} owner - The owner of the repository.
     * @param {string} repositoryName - The name of the repository.
     * @returns An array of `Contributor` objects, or `null` on error.
     */
    async contributors(owner: string, repositoryName: string): Promise<Contributor[] | null> {
        const response = await this.get(`/repos/${owner}/${repositoryName}/contributors`);

        if (!response.data) {
            return response.data;
        }

        return response.data.filter(contributor => contributor.type === 'User');
    }

    async repository(owner: string, name: string): Promise<any> {
        const response = await this.get(`/repos/${owner}/${name}`);

        return response.data;
    }

    async repositoryEvents(owner: string, name: string): Promise<Event[] | null> {
        const response = await this.get(`/repos/${owner}/${name}/events`);

        return response.data;
    }

    async user(login: string): Promise<GithubUser | null> {
        const response = await this.get(`users/${login}`);
        return response.data;
    }
}
