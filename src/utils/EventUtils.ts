import { GithubApiClient } from './lib/GithubApiClient';

export type Events = Event[];

export interface Event {
    id: string;
    type: string;
    actor: Actor;
    repo: Repo;
    payload: Payload;
    public: boolean;
    created_at: string;
    org: Org;
}

export interface Actor {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

export interface Repo {
    id: number;
    name: string;
    url: string;
}

export interface Payload {
    push_id?: number;
    size?: number;
    distinct_size?: number;
    ref?: string;
    head?: string;
    before?: string;
    commits?: Commit[];
    ref_type?: string;
    pusher_type?: string;
    action?: string;
    issue?: Issue;
    comment?: Comment;
    number?: number;
    pull_request?: PullRequest2;
}

export interface Commit {
    sha: string;
    author: Author;
    message: string;
    distinct: boolean;
    url: string;
}

export interface Author {
    email: string;
    name: string;
}

export interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: User;
    labels: Label[];
    state: string;
    locked: boolean;
    assignee: any;
    assignees: any[];
    milestone: any;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: any;
    author_association: string;
    active_lock_reason: any;
    draft: boolean;
    pull_request: PullRequest;
    body: string;
    reactions: Reactions;
    timeline_url: string;
    performed_via_github_app: any;
    state_reason: any;
}

export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Label {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string;
}

export interface PullRequest {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: any;
}

export interface Reactions {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
}

export interface Comment {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    node_id: string;
    user: User2;
    created_at: string;
    updated_at: string;
    author_association: string;
    body: string;
    reactions: Reactions2;
    performed_via_github_app: any;
}

export interface User2 {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Reactions2 {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
}

export interface PullRequest2 {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: User3;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at?: string;
    merge_commit_sha: string;
    assignee: any;
    assignees: any[];
    requested_reviewers: any[];
    requested_teams: any[];
    labels: Label2[];
    milestone: any;
    draft: boolean;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: Head;
    base: Base;
    _links: Links;
    author_association: string;
    auto_merge: any;
    active_lock_reason: any;
    merged: boolean;
    mergeable?: boolean;
    rebaseable?: boolean;
    mergeable_state: string;
    merged_by?: MergedBy;
    comments: number;
    review_comments: number;
    maintainer_can_modify: boolean;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
}

export interface User3 {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Label2 {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string;
}

export interface Head {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: Repo2;
}

export interface User4 {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Repo2 {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: any;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: any;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: License;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: any[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}

export interface Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface License {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface Base {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: Repo;
}

export interface User5 {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Repo3 {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: any;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: any;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: License;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: any[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}

export interface Links {
    self: Self;
    html: Html;
    issue: Issue2;
    comments: Comments;
    review_comments: ReviewComments;
    review_comment: ReviewComment;
    commits: Commits;
    statuses: Statuses;
}

export interface Self {
    href: string;
}

export interface Html {
    href: string;
}

export interface Issue2 {
    href: string;
}

export interface Comments {
    href: string;
}

export interface ReviewComments {
    href: string;
}

export interface ReviewComment {
    href: string;
}

export interface Commits {
    href: string;
}

export interface Statuses {
    href: string;
}

export interface MergedBy {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Org {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

export class EventUtils {
    async repositoryEvents(owner: string, name: string): Promise<Event[]> {
        const client = new GithubApiClient();
        const data = await client.repositoryEvents(owner, name);

        return data ? data : [];
    }

    getPushEventsWithCommits(events: Event[]): Event[] {
        return events.filter(event => event.type === 'PushEvent').filter(event => event.payload.commits !== undefined && event.payload.commits.length > 0);
    }

    searchPushEventsForUserInfo(events: Event[], email: string, fullName: string): Event[] {
        return this.getPushEventsWithCommits(events).filter(event =>
            event.payload.commits?.some(commit => commit.author.email === email || commit.author.name === fullName),
        );
    }

    searchPushEventsForEmail(events: Event[], email: string): Event[] {
        return this.getPushEventsWithCommits(events).filter(event => event.payload.commits?.some(commit => commit.author.email === email));
    }

    searchPushEventsForAuthorName(events: Event[], authorName: string): Event[] {
        return this.getPushEventsWithCommits(events).filter(event => event.payload.commits?.some(commit => commit.author.name === authorName));
    }

    searchEventsForGithubUsernameByEmail(events: Event[], email: string): string | null {
        const pushEvents = this.searchPushEventsForEmail(events, email);

        return pushEvents.length ? pushEvents[0].actor.login : null;
    }

    searchEventsForGithubUsernameByAuthorName(events: Event[], email: string): string | null {
        const pushEvents = this.searchPushEventsForAuthorName(events, email);

        return pushEvents.length ? pushEvents[0].actor.login : null;
    }

    async searchRepositoryCommitsForGithubUsername(owner: string, name: string, authorEmail: string, authorName: string): Promise<string | null> {
        const events = await this.repositoryEvents(owner, name);

        const result = this.searchEventsForGithubUsernameByEmail(this.searchPushEventsForEmail(events, authorEmail), authorEmail);

        if (!result) {
            return this.searchEventsForGithubUsernameByAuthorName(this.searchPushEventsForAuthorName(events, authorName), authorName);
        }

        return result;
    }
}
