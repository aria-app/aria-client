import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes } from 'recompose';
import sequencing from 'ducks/sequencing';
import shared from 'ducks/shared';
import tracking from 'ducks/tracking';
import transport from 'ducks/transport';
import './app.scss';

const { SequencerContainer } = sequencing.components;
const { TrackerContainer } = tracking.components;
const { ContextMenu, IconButton, Toolbar } = shared.components;
const { doOnMount } = shared.helpers;
const { PAUSED, STARTED, STOPPED } = transport.constants.playbackStates;

const component = (props) => h('.app', [
  props.activeSequenceId
    ? h(SequencerContainer)
    : h(TrackerContainer),
  h(Toolbar, {
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
    ],
    rightItems: [
      h('input', {
        type: 'number',
        value: props.bpm,
        min: shared.constants.minBPM,
        max: shared.constants.maxBPM,
        onChange: (e) => props.setBPM(e.target.value),
      }),
      h(IconButton, {
        icon: 'long-arrow-left',
        onPress: props.decrementMeasureCount,
      }),
      h(IconButton, {
        icon: 'long-arrow-right',
        onPress: props.incrementMeasureCount,
      }),
    ],
  }),
  h(ContextMenu, {
    position: props.contextMenuPosition,
    isOpen: !_.isEmpty(props.contextMenuItems),
    items: props.contextMenuItems,
    onRequestClose: props.closeContextMenu,
    onSelect: props.onContextMenuItemSelect,
  }),
]);

const composed = compose([
  setDisplayName('App'),
  pure,
  setPropTypes({
    activeSequenceId: React.PropTypes.string.isRequired,
    bpm: React.PropTypes.number.isRequired,
    closeContextMenu: React.PropTypes.func.isRequired,
    contextMenuItems: React.PropTypes.array.isRequired,
    contextMenuPosition: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }).isRequired,
    decrementMeasureCount: React.PropTypes.func.isRequired,
    incrementMeasureCount: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    onContextMenuItemSelect: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    setBPM: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
  }),
  doOnMount((props) => {
    props.initialize();
  }),
])(component);

export const App = composed;
