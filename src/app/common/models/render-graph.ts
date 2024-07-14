export interface RenderRepository {
    branches: RenderBranch[],
    commits: RenderCommit[],
    links: RenderLink[],
    name: string | null,
}

export interface RenderLink {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
}

export interface RenderCommit {
    x: number,
    y: number,
    name: string | null,
}

export interface RenderBranch {
    name: string | null,
    lineY: number,
}

export interface RenderGraph {
    repositories: RenderRepository[]
}