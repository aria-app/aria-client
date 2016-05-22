import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import { Toolbar } from '../toolbar/toolbar';
import './sequence.scss';

const { getChildRef, scrollTo } = shared.helpers;

const component = (props) => h('.sequence', [
  h(Toolbar, {
    changeSynthType: props.changeSynthType,
    setToolType: props.setToolType,
    synthType: props.synthType,
    toolType: props.toolType,
  }),
  h('.sequence__content', {
    onScroll: props.onContentScroll,
  }, [
    h('.sequence__wrapper', [
      h(KeysContainer),
      h(GridContainer, {
        sequenceContentRef: props.childRef,
      }),
    ]),
  ]),
]);

const composed = compose([
  setPropTypes({
    changeSynthType: React.PropTypes.func,
    setToolType: React.PropTypes.func,
    synthType: React.PropTypes.string.isRequired,
    toolType: React.PropTypes.string.isRequired,
    setScrollTopIfChanged: React.PropTypes.func,
  }),
  getChildRef('.sequence__content'),
  scrollTo({
    scrollTop: 'center',
    selector: '.sequence__content',
  }),
  pure,
  withHandlers({
    onContentScroll,
  }),
])(component);

export const Sequence = composed;

function onContentScroll(props) {
  return (e) => {
    props.setScrollTopIfChanged(Math.floor(e.target.scrollTop / 40));
  };
}
