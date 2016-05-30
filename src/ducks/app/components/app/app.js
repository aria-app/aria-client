import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes } from 'recompose';
import sequencer from 'ducks/sequencer';
import shared from 'ducks/shared';
import tracking from 'ducks/tracking';
import transport from 'ducks/transport';
import './app.scss';

const { SequencerContainer } = sequencer.components;
const { TrackerContainer } = tracking.components;
const { IconButton, Toolbar } = shared.components;
const { doOnMount } = shared.helpers;
const { PAUSED, STARTED, STOPPED } = transport.constants.playbackStates;

const component = ({
  activeSequenceId,
  bpm,
  pause,
  play,
  playbackState,
  setBPM,
  stop,
}) => h('.app', [
  activeSequenceId !== undefined
    ? h(SequencerContainer)
    : h(TrackerContainer),
  h(Toolbar, {
    position: 'bottom',
    leftItems: [
      h(IconButton, {
        isActive: playbackState === STARTED,
        icon: 'play',
        onPress: () => play(),
      }),
      h(IconButton, {
        isActive: playbackState === PAUSED,
        icon: 'pause',
        onPress: () => pause(),
      }),
      h(IconButton, {
        isActive: playbackState === STOPPED,
        icon: 'stop',
        onPress: () => stop(),
      }),
      h('input', {
        type: 'number',
        value: bpm,
        min: shared.constants.minBPM,
        max: shared.constants.maxBPM,
        onChange: (e) => setBPM(e.target.value),
      }),
    ],
  }),
]);

const composed = compose([
  setDisplayName('App'),
  pure,
  setPropTypes({
    activeSequenceId: React.PropTypes.number,
    bpm: React.PropTypes.number,
    initialize: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string,
    setBPM: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
  }),
  doOnMount((props) => {
    props.initialize();
  }),
])(component);

export const App = composed;
