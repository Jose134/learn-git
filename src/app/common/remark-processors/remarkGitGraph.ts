import { visit } from 'unist-util-visit';
import { GitGraph } from '../models/git-graph';
import { GraphValidationService } from '../services/graph-validation-service';

function remarkGitGraph() {
  return (tree: any) => {
    visit(tree, "text", (node: any) => {
      const lineSplit = node.value.split('\n');
      if (lineSplit && lineSplit[0] === 'GIT-GRAPH') {
        const graphStr: string = lineSplit.slice(1).join('\n');
        const graph: GitGraph = GraphValidationService.validateGraph(graphStr);
        
        node.type = 'git-graph';
        node.graph = graph;
        delete node.value;
      }
    });
  };
}

export default remarkGitGraph;