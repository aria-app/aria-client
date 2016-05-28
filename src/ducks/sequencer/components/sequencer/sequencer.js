import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import './sequencer.scss';

const { DropdownList, IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { PAUSED, STARTED, STOPPED } = transport.constants.playbackStates;
const { getChildRef, scrollTo } = shared.helpers;

const component = (props) => h('.sequencer', [
  props.actionsToolbar,
  h('.sequencer__content', {
    onScroll: props.onContentScroll,
  }, [
    h('.sequencer__wrapper', [
      h(KeysContainer),
      h(GridContainer, {
        sequencerContentRef: props.childRef,
      }),
    ]),
  ]),
  props.playbackToolbar,
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
  getChildRef('.sequencer__content'),
  scrollTo({
    scrollTop: 'center',
    selector: '.sequencer__content',
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
          getSizingDropdown(props),
        ],
      })
      : h(Toolbar, {
        leftItems: [
          ...getToolButtons(props),
        ],
      }),
    playbackToolbar: h(Toolbar, {
      position: 'bottom',
      leftItems: [
        h(IconButton, {
          isActive: props.playbackState === STARTED,
          icon: 'play',
          onPress: () => props.play(),
        }),
        h(IconButton, {
          isActive: props.playbackState === PAUSED,
          icon: 'pause',
          onPress: () => props.pause(),
        }),
        h(IconButton, {
          isActive: props.playbackState === STOPPED,
          icon: 'stop',
          onPress: () => props.stop(),
        }),
        h(IconButton, {
          icon: 'star',
          onPress: () => props.setActiveSequenceId(0),
        }),
        h(IconButton, {
          icon: 'user',
          onPress: () => props.setActiveSequenceId(1),
        }),
      ],
    }),
  })),
])(component);

export const Sequencer = composed;

function getSelectionCommands(props) {
  return [
    h(IconButton, {
      icon: 'trash',
      toolTip: 'Delete',
      onPress: () => props.removeSelected(),
    }),
    h(IconButton, {
      icon: 'clone',
      toolTip: 'Duplicate',
      onPress: () => props.duplicate(),
    }),
    h(IconButton, {
      icon: 'arrow-up',
      toolTip: 'Up Octave',
      onPress: () => props.shiftUpOctave(),
    }),
    h(IconButton, {
      icon: 'arrow-down',
      toolTip: 'Down Octave',
      onPress: () => props.shiftDownOctave(),
    }),
  ];
}

function getSizingDropdown(props) {
  return h(DropdownList, {
    icon: 'long-arrow-right',
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
  });
}

function getToolButtons(props) {
  return [
    h(IconButton, {
      isActive: props.toolType === SELECT,
      icon: 'mouse-pointer',
      onPress: () => props.setToolType(SELECT),
    }),
    h(IconButton, {
      isActive: props.toolType === DRAW,
      icon: 'pencil',
      onPress: () => props.setToolType(DRAW),
    }),
    h(IconButton, {
      isActive: props.toolType === ERASE,
      icon: 'eraser',
      onPress: () => props.setToolType(ERASE),
    }),
    h(IconButton, {
      isActive: props.toolType === PAN,
      icon: 'hand-paper-o',
      onPress: () => props.setToolType(PAN),
    }),
  ];
}

function onContentScroll(props) {
  return (e) => {
    props.setScrollTopIfChanged(Math.floor(e.target.scrollTop / 40));
  };
}
