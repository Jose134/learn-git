import { visit } from 'unist-util-visit';

function remarkChips() {

  return (tree: any) => {
    visit(tree, "heading", (node: any) => {
      if (node.depth === 1 && node.children[0].value.trim().startsWith('CHIPS')) {
        node.type = 'chips';
        const txt: string = node.children[0].value;
        
        delete node.depth;
        delete node.children;
        
        node.chips = [];
        txt.slice(5).split(':').forEach(chipText => {
          node.chips.push(chipText);
        });
      }
    });
  };
}

export default remarkChips;