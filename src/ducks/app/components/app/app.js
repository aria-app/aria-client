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
  pause,
  play,
  playbackState,
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
    ],
  }),
]);

const composed = compose([
  pure,
  setDisplayName('App'),
  setPropTypes({
    activeSequenceId: React.PropTypes.number,
    initialize: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string,
    stop: React.PropTypes.func.isRequired,
  }),
  doOnMount((props) => {
    props.initialize();
  }),
])(component);

export const App = composed;
