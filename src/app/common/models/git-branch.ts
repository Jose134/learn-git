import { GitCommit } from "./git-commit";

export interface GitBranch {
    name?: string;
    commitColor?: string;
    commits: GitCommit[];
}