export interface Repository {
    name: string | null,
    branches: Branch[],
}

export interface Commit {
    name: string | null,
    hash: string,
    parents: string[],
}

export interface Branch {
    name: string | null,
    commits: Commit[],
}

export interface GitGraph {
    repositories?: Repository[],
    valid: boolean,
    errors?: string[],
}