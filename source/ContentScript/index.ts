/**
 *  @author abhijithvijayan <abhijithvijayan.in>
 */

import {isEmpty} from '@abhijithvijayan/ts-utils';

type NullOr<T> = null | T;

// find node element from tree
function searchTree<T extends Element>(
  root: Element | Element[],
  value: unknown,
  key: keyof Element = 'id',
  {reverse = false} = {}
): NullOr<T> {
  let stack: Element[];
  if (!Array.isArray(root)) {
    stack = [root];
  } else {
    stack = root;
  }

  while (!isEmpty(stack)) {
    const node: T = stack[reverse ? 'pop' : 'shift']() as T;
    if (node[key] === value) {
      return node;
    }

    if (node.children) {
      stack.push(...node.children);
    }
  }

  return null;
}

((): void => {
  const youtubeUrl = 'https://www.youtube.com';

  // check if on Videos Page on Google
  // refer: https://regex101.com/r/dxeCFd/1
  if (/\btbm=vid\b/i.test(window.location.search)) {
    // get search results
    const list = Array.from(
      document.getElementsByTagName('video-voyager')
    ) as HTMLElement[];

    if (!isEmpty(list)) {
      console.log('just-YouTube: Showing YouTube results only');

      list.forEach((entry) => {
        // find the anchor element and check if the hostname is that of youtube
        const linkTag = searchTree<HTMLAnchorElement>(entry, 'A', 'tagName');
        if (linkTag?.origin !== youtubeUrl) {
          // hide the video item
          entry.style.display = 'none';
        }
      });
    }
  }
})();
