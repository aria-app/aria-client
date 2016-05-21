import h from 'react-hyperscript';
import { compose, pure } from 'recompose';
import shared from 'modules/shared';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import {
  SequenceToolbarContainer,
} from '../sequence-toolbar-container/sequence-toolbar-container';
import './sequence.scss';

const { getChildRef, scrollTo } = shared.helpers;

const component = ({
  childRef,
}) => h('.sequence', [
  h(SequenceToolbarContainer),
  h('.sequence__content', [
    h('.sequence__wrapper', [
      h(KeysContainer),
      h(GridContainer, {
        sequenceContentRef: childRef,
      }),
    ]),
  ]),
]);

const composed = compose([
  getChildRef('.sequence__content'),
  scrollTo({
    scrollTop: 'center',
    selector: '.sequence__content',
    onScroll: (props, scrollTop) => {
      props.setScrollTop(scrollTop);
    },
  }),
  pure,
])(component);

export const Sequence = composed;
