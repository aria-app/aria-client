import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import './sequence.scss';

const { Button, ToggleButton, Toolbar } = shared.components;
// const { PWM, SAWTOOTH, SINE, SQUARE } = shared.constants.synthTypes;
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
    changeSynthType: React.PropTypes.func.isRequired,
    removeSelected: React.PropTypes.func.isRequired,
    duplicate: React.PropTypes.func.isRequired,
    isSelectionActive: React.PropTypes.bool,
    setSelectedNoteSizes: React.PropTypes.func.isRequired,
    setToolType: React.PropTypes.func.isRequired,
    shiftDownOctave: React.PropTypes.func.isRequired,
    shiftUpOctave: React.PropTypes.func.isRequired,
    synthType: React.PropTypes.string.isRequired,
    toolType: React.PropTypes.string.isRequired,
    setScrollTopIfChanged: React.PropTypes.func.isRequired,
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
      })
      : h(Toolbar, {
        leftItems: getToolButtons(props),
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
      text: 'DELETE',
      onPress: () => props.removeSelected(),
    }),
    h(Button, {
      text: 'DUPLICATE',
      onPress: () => props.duplicate(),
    }),
    h(Button, {
      text: 'UP OCTAVE',
      onPress: () => props.shiftUpOctave(),
    }),
    h(Button, {
      text: 'DOWN OCTAVE',
      onPress: () => props.shiftDownOctave(),
    }),
    h(Button, {
      text: '1/32',
      onPress: () => props.setSelectedNoteSizes(1),
    }),
    h(Button, {
      text: '1/16',
      onPress: () => props.setSelectedNoteSizes(2),
    }),
    h(Button, {
      text: '1/8',
      onPress: () => props.setSelectedNoteSizes(4),
    }),
    h(Button, {
      text: '1/4',
      onPress: () => props.setSelectedNoteSizes(8),
    }),
    h(Button, {
      text: '1/2',
      onPress: () => props.setSelectedNoteSizes(16),
    }),
    h(Button, {
      text: '1',
      onPress: () => props.setSelectedNoteSizes(32),
    }),
  ];
}

// function getSynthButtons(props) {
//   return [
//     h(ToggleButton, {
//       isActive: props.synthType === SQUARE,
//       text: 'SQUARE',
//       onPress: () => props.setSynthType(SQUARE),
//     }),
//     h(ToggleButton, {
//       isActive: props.synthType === SAWTOOTH,
//       text: 'SAWTOOTH',
//       onPress: () => props.setSynthType(SAWTOOTH),
//     }),
//     h(ToggleButton, {
//       isActive: props.synthType === PWM,
//       text: 'PWM',
//       onPress: () => props.setSynthType(PWM),
//     }),
//     h(ToggleButton, {
//       isActive: props.synthType === SINE,
//       text: 'SINE',
//       onPress: () => props.setSynthType(SINE),
//     }),
//   ];
// }

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
