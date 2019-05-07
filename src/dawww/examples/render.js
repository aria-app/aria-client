import { patch } from 'superfine';

const root = document.querySelector('#root');
let element = root;
let oldNode;
let oldProps = {};

export default function render(getNode, propUpdates) {
  const props = {
    ...oldProps,
    ...propUpdates,
  };
  const node = getNode(props);

  oldNode = patch(oldNode, node, element);

  oldProps = props;
}
