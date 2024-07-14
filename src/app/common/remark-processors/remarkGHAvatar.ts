import { visit } from 'unist-util-visit';

function remarkGHAvatar() {
  const GITHUB_AVATAR_REGEX = /https\:\/\/avatars\.githubusercontent\.com\/u\/\d+/;

  return (tree: any) => {
    visit(tree, "image", (node: any) => {
      if (GITHUB_AVATAR_REGEX.test(node.url)) {
        node.type = 'github-avatar';
      }
    });
  };
}

export default remarkGHAvatar;