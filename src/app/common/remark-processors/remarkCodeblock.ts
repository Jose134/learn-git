import { visit } from 'unist-util-visit';
import { HighlightingService } from '../services/highlighting-service';

function remarkCodeblock() {

  return (tree: any) => {
    visit(tree, "code", (node: any) => {
      if (node.value.startsWith('SOLUTION')) {
        node.value = node.value.replace('SOLUTION\n', '');
        node.isSolution = true;
      }
      
      node.value = HighlightingService.buildHighlighting(node.value);
    });
  };
}

export default remarkCodeblock;