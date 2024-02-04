import { GitBranch } from "./git-branch";

export interface GitRepo {
    name?: string;
    headHash?: string;
    branches: GitBranch[];
}