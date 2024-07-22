import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RenderGraph, RenderLink, RenderRepository } from '../../models/render-graph';
import { Branch, Commit, GitGraph, Repository } from '../../models/git-graph';

interface Coord {
  x: number,
  y: number
}

interface CommitTreeNode {
  commit: Commit,               // Hash of the commit
  level: number,                // Tree level of the commit
  children: CommitTreeNode[]    // Children of the commit
}

@Component({
  selector: 'app-git-graph',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './git-graph.component.svg',
  styleUrl: './git-graph.component.css'
})
export class GitGraphComponent implements OnInit {

  readonly COMMIT_RADIUS = 30;
  readonly BRANCH_HEIGHT = 70;
  readonly BRANCH_LINE_PERCENT_X1 = 20;
  readonly BRANCH_LINE_PERCENT_X2 = 90;
  readonly BRANCH_TEXT_MARGIN = 20;

  @Input({ required: true }) graph: GitGraph | null = null;
  renderGraph: RenderGraph | null = null;

  ngOnInit(): void {
    if (this.graph) {
      this.renderGraph = this.buildRenderGraph(this.graph);
    }
  }

  private buildRenderGraph(graph: GitGraph): RenderGraph {
    let renderGraph: RenderGraph = { repositories: [] };

    graph.repositories?.forEach((repo: Repository) => {
      renderGraph.repositories.push(this.buildRenderRepository(repo));
    });

    return renderGraph; 
  }

  private buildRenderRepository(repository: Repository): RenderRepository {
    const commitsCoordMap: Map<string, Coord> = this.buildCommitsCoordinatesMap(repository); 

    let renderRepo: RenderRepository = { name: repository.name, branches: [], links: [], commits: [] };

    const biggestX: number = [...commitsCoordMap.values()].map((item: Coord) => item.x).sort().splice(-1)[0];
    const commitBoxWidth =
      ((this.BRANCH_LINE_PERCENT_X2 - this.BRANCH_LINE_PERCENT_X1) * 10 - this.COMMIT_RADIUS * 2) /biggestX;

      // Branches
      repository.branches.forEach((branch: Branch, branchIdx: number) => {
        renderRepo.branches.push({ name: branch.name, lineY: (branchIdx + 1) * this.BRANCH_HEIGHT });
      });

      // Links
      const allCommits = repository.branches.flatMap((branch: Branch) => branch.commits);
      allCommits.forEach((c: any) => {
        if (c.parents) {
          c.parents.forEach((pHash: string) => {
            const parentCoords: Coord = commitsCoordMap.get(pHash) ?? { x: 0, y: 0 };
            const childCoords: Coord = commitsCoordMap.get(c.hash) ?? { x: 0, y: 0 };

            const renderLink: RenderLink = {
              x1: this.COMMIT_RADIUS + this.BRANCH_LINE_PERCENT_X1 * 10 + parentCoords.x * commitBoxWidth,
              y1: parentCoords.y * this.BRANCH_HEIGHT,
              x2: this.COMMIT_RADIUS + this.BRANCH_LINE_PERCENT_X1 * 10 + childCoords.x * commitBoxWidth,
              y2: childCoords.y * this.BRANCH_HEIGHT
            }

            renderRepo.links.push(renderLink);
          });
          
        }
      });

      // Commits
      allCommits.forEach((commit: Commit) => {
        const coords = commitsCoordMap.get(commit.hash) ?? { x: 0, y: 0 };
        const cx = this.COMMIT_RADIUS + this.BRANCH_LINE_PERCENT_X1 * 10 + coords.x * commitBoxWidth;
        const cy = coords.y * this.BRANCH_HEIGHT;
        renderRepo.commits.push({ x: cx, y: cy, name: commit.name });
      });

    return renderRepo;
  }


  private buildCommitsCoordinatesMap(repo: Repository): Map<string, Coord> {
    const commitsTree = this.buildCommitsTree(repo.branches);
    if (!commitsTree) { return new Map(); }

    let result: Map<string, Coord> = new Map();
    const dfsStack = [commitsTree];
    while (dfsStack.length !== 0) {
      let node: CommitTreeNode | undefined = dfsStack.pop();
      if (node == undefined) { continue; }

      let coord: Coord | undefined = result.get(node.commit.hash);
      if (!coord) {
        let branchIdx = repo.branches.findIndex((b: Branch) => b.commits.filter((c: Commit) => c.hash === node?.commit.hash).length != 0);
        result.set(node.commit.hash, {
          x: node.level,
          y: branchIdx + 1
        });
      }
      else {
        coord.x = Math.max(node.level, coord.x);
      }

      node.children.forEach((c: any) => {
        dfsStack.push(c);
      });
    }

    return result;
  }

  private buildCommitsTree(branches: Branch[]): CommitTreeNode | null {
    let allCommits = branches.flatMap((branch: Branch) => branch.commits);
    const firstCommit = allCommits.find((c: Commit) => c.parents == undefined);
    if (firstCommit) {
      allCommits = allCommits.filter((c: Commit) => c.hash != firstCommit.hash);
      return this.buildSubTree(allCommits, firstCommit, 0);
    }
    else {
      return null;
    }
  }

  private buildSubTree(allCommits: Commit[], commit: Commit, level: number): CommitTreeNode {
    let node: CommitTreeNode = {
      "commit": commit,
      "level": level,
      "children": []
    };

    let childrenCommits: any[] = allCommits.filter((c: Commit) => c.parents && c.parents.includes(commit.hash));
    // Use normal loop instead of childrenCommits.forEach to reduce the amount of methods called in the stack
    for (let i = 0; i < childrenCommits.length; i++) {
      node.children.push(this.buildSubTree(allCommits, childrenCommits[i], level + 1));
    }

    return node;
  }

}
