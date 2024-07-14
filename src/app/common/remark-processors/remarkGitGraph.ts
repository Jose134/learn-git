import { visit } from 'unist-util-visit';

function remarkGitGraph() {
  return (tree: any) => {
    visit(tree, "text", (node: any) => {
      const lineSplit = node.value.split('\n');
      if (lineSplit && lineSplit[0] === 'GIT-SVG') {
        node.type = 'git-graph';
        node.src = lineSplit[1];
        delete node.value;
      }
    });
  };
}

export default remarkGitGraph;