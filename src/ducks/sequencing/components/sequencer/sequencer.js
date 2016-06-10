import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { GridContainer } from '../grid-container/grid-container';
import { KeysContainer } from '../keys-container/keys-container';
import './sequencer.scss';

const { DropdownList, IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { getChildRef, scrollTo } = shared.helpers;
const scale = shared.helpers.getScale();

const component = (props) => h('.sequencer', {
  style: props.style,
}, [
  props.actionsToolbar,
  h('.sequencer__content', {
    onScroll: props.onContentScroll,
  }, [
    h('.sequencer__wrapper', [
      h(KeysContainer, {
        scale,
      }),
      h(GridContainer, {
        sequencerContentRef: props.childRef,
      }),
    ]),
  ]),
]);

const composed = compose([
  setDisplayName('Sequencer'),
  pure,
  setPropTypes({
    closeSequence: React.PropTypes.func.isRequired,
    duplicate: React.PropTypes.func.isRequired,
    isSelectingActive: React.PropTypes.bool,
    removeSelected: React.PropTypes.func.isRequired,
    scrolledVertically: React.PropTypes.func.isRequired,
    resizeSelected: React.PropTypes.func.isRequired,
    selectTool: React.PropTypes.func.isRequired,
    shiftDownOctave: React.PropTypes.func.isRequired,
    shiftUpOctave: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
  }),
  getChildRef('.sequencer__content'),
  scrollTo({
    scrollTop: 'center',
    selector: '.sequencer__content',
  }),
  pure,
  withHandlers({
    close: (props) => () => {
      props.closeSequence();
    },
    onContentScroll,
  }),
  mapProps(props => ({
    ...props,
    actionsToolbar: props.isSelectingActive
      ? h(Toolbar, {
        leftItems: [
          ...getSelectingCommands(props),
        ],
        rightItems: [
          getSizingDropdown(props),
          h(IconButton, {
            icon: 'close',
            onPress: props.close,
          }),
        ],
      })
      : h(Toolbar, {
        leftItems: [
          ...getToolButtons(props),
        ],
        rightItems: [
          h(IconButton, {
            icon: 'close',
            onPress: props.close,
          }),
        ],
      }),
  })),
])(component);

export const Sequencer = composed;

function getSelectingCommands(props) {
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
      { text: '1/32', value: 1 },
      { text: '1/16', value: 2 },
      { text: '1/8', value: 4 },
      { text: '1/4', value: 8 },
      { text: '1/2', value: 16 },
      { text: '1', value: 32 },
    ],
    onSelect: (item) => props.resizeSelected(item.value),
  });
}

function getToolButtons(props) {
  return [
    h(IconButton, {
      isActive: props.toolType === SELECT,
      icon: 'mouse-pointer',
      onPress: () => props.selectTool(SELECT),
    }),
    h(IconButton, {
      isActive: props.toolType === DRAW,
      icon: 'pencil',
      onPress: () => props.selectTool(DRAW),
    }),
    h(IconButton, {
      isActive: props.toolType === ERASE,
      icon: 'eraser',
      onPress: () => props.selectTool(ERASE),
    }),
    h(IconButton, {
      isActive: props.toolType === PAN,
      icon: 'hand-paper-o',
      onPress: () => props.selectTool(PAN),
    }),
  ];
}

function onContentScroll(props) {
  return (e) => {
    props.scrolledVertically(Math.floor(e.target.scrollTop / 40));
  };
}
