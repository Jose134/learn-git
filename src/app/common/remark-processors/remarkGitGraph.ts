import { visit } from 'unist-util-visit';
import { GitGraph } from '../models/git-graph';

function remarkGitGraph() {
  return (tree: any) => {
    visit(tree, "text", (node: any) => {
      const lineSplit = node.value.split('\n');
      if (lineSplit && lineSplit[0] === 'GIT-GRAPH') {
        const graph = JSON.parse(lineSplit.slice(1).join('\n'));
        
        node.type = 'git-graph';
        node.graph = graph as GitGraph;
        delete node.value;
      }
    });
  };
}

export default remarkGitGraph;