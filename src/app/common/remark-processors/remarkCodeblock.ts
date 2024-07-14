import { visit } from 'unist-util-visit';

function remarkCodeblock() {

  return (tree: any) => {
    visit(tree, "code", (node: any) => {
      if (node.value.startsWith('SOLUTION')) {
        node.value = node.value.replace('SOLUTION\n', '');
        node.type = 'solution-codeblock';
      }
    });
  };
}

export default remarkCodeblock;