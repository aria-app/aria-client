import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes } from 'recompose';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import './song-toolbar.scss';

const { IconButton, Toolbar } = shared.components;
const { PAUSED, STARTED, STOPPED } = transport.constants.playbackStates;

const component = (props) => h(Toolbar, {
  className: 'song-toolbar',
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
});

const composed = compose([
  setDisplayName('SongToolbar'),
  pure,
  setPropTypes({
    bpm: React.PropTypes.number.isRequired,
    decrementMeasureCount: React.PropTypes.func.isRequired,
    incrementMeasureCount: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    setBPM: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
  }),
])(component);

export const SongToolbar = composed;
