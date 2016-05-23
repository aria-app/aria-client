import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import sound from 'ducks/sound';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import './sequence.scss';

const { Button, DropdownList, ToggleButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { PAUSED, STARTED, STOPPED } = sound.constants.playbackStates;
const { getChildRef, scrollTo } = shared.helpers;

const component = (props) => h('.sequence', [
  props.actionsToolbar,
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
  h(Toolbar, {
    leftItems: [
      h(ToggleButton, {
        isActive: props.playbackState === STARTED,
        text: 'PLAY',
        onPress: () => props.play(),
      }),
      h(ToggleButton, {
        isActive: props.playbackState === PAUSED,
        text: 'PAUSE',
        onPress: () => props.pause(),
      }),
      h(ToggleButton, {
        isActive: props.playbackState === STOPPED,
        text: 'STOP',
        onPress: () => props.stop(),
      }),
    ],
  }),
]);

const composed = compose([
  setPropTypes({
    changeSynthType: React.PropTypes.func.isRequired,
    removeSelected: React.PropTypes.func.isRequired,
    duplicate: React.PropTypes.func.isRequired,
    isSelectionActive: React.PropTypes.bool,
    playbackState: React.PropTypes.string.isRequired,
    setSelectedNoteSizes: React.PropTypes.func.isRequired,
    setToolType: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
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
  withHandlers({
    onContentScroll,
    onSelect: (props) => (item) => {
      props.changeSynthType(item.id);
    },
  }),
  mapProps(props => ({
    ...props,
    actionsToolbar: props.isSelectionActive
      ? h(Toolbar, {
        leftItems: [
          ...getSelectionCommands(props),
        ],
        rightItems: [
          h(DropdownList, {
            items: [
              {
                text: '1/32',
                value: 1,
              },
              {
                text: '1/16',
                value: 2,
              },
              {
                text: '1/8',
                value: 4,
              },
              {
                text: '1/4',
                value: 8,
              },
              {
                text: '1/2',
                value: 16,
              },
              {
                text: '1',
                value: 32,
              },
            ],
            onSelect: (item) => props.setSelectedNoteSizes(item.value),
            text: 'SET LENGTH',
          }),

        ],
      })
      : h(Toolbar, {
        leftItems: [
          ...getToolButtons(props),
        ],
      }),
  })),
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
