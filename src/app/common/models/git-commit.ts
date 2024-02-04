export interface GitCommit {
    hash: string; // Hash of the commit
    name?:  string; // Optional name for commit
    parents?: string[]; // Hash of parent commits
    color?: string; // Override branch color
    showHash?: boolean; // Override graph showHash
}