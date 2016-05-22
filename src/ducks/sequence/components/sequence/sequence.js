import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import './sequence.scss';

const { Button, ToggleButton, Toolbar } = shared.components;
const { PWM, SAWTOOTH, SINE, SQUARE } = shared.constants.synthTypes;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { getChildRef, scrollTo } = shared.helpers;

const component = (props) => h('.sequence', [
  props.toolbar,
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
    duplicate: React.PropTypes.func,
    isSelectionActive: React.PropTypes.bool,
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
  mapProps(props => ({
    ...props,
    toolbar: props.isSelectionActive
      ? h(Toolbar, {
        leftItems: getSelectionCommands(props),
        // rightItems: getSynthButtons(props),
      })
      : h(Toolbar, {
        leftItems: getToolButtons(props),
        // rightItems: getSynthButtons(props),
      }),
  })),
  withHandlers({
    onContentScroll,
  }),
])(component);

export const Sequence = composed;

function getSelectionCommands(props) {
  return [
    h(Button, {
      text: 'DUPLICATE',
      onPress: () => props.duplicate(),
    }),
  ];
}

function getSynthButtons(props) {
  return [
    h(ToggleButton, {
      isActive: props.synthType === SQUARE,
      text: 'SQUARE',
      onPress: () => props.setSynthType(SQUARE),
    }),
    h(ToggleButton, {
      isActive: props.synthType === SAWTOOTH,
      text: 'SAWTOOTH',
      onPress: () => props.setSynthType(SAWTOOTH),
    }),
    h(ToggleButton, {
      isActive: props.synthType === PWM,
      text: 'PWM',
      onPress: () => props.setSynthType(PWM),
    }),
    h(ToggleButton, {
      isActive: props.synthType === SINE,
      text: 'SINE',
      onPress: () => props.setSynthType(SINE),
    }),
  ];
}

function getToolButtons(props) {
  return [
    h(ToggleButton, {
      isActive: props.toolType === SELECT,
      text: 'SELECT',
      onPress: () => props.setToolType(SELECT),
    }),
    h(ToggleButton, {
      isActive: props.toolType === DRAW,
      text: 'DRAW',
      onPress: () => props.setToolType(DRAW),
    }),
    h(ToggleButton, {
      isActive: props.toolType === ERASE,
      text: 'ERASE',
      onPress: () => props.setToolType(ERASE),
    }),
    h(ToggleButton, {
      isActive: props.toolType === PAN,
      text: 'PAN',
      onPress: () => props.setToolType(PAN),
    }),
  ];
}

function onContentScroll(props) {
  return (e) => {
    props.setScrollTopIfChanged(Math.floor(e.target.scrollTop / 40));
  };
}
