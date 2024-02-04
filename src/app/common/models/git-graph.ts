import { GitRepo } from "./git-repo";

export interface GitGraph {
    title?: string;
    showCommitHash?: boolean;
    repositories: GitRepo[];
}