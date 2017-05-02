import forEach from 'lodash/fp/forEach';
import S from 'sanctuary';
import * as constants from './constants';
import Instrument from './Instrument';
import Tone from './tone';

const instrument = Instrument.create('a', 'square');
const playbackStateSubscribers = [];

Tone.onPause(handlePause);
Tone.onStart(handleStart);
Tone.onStop(handleStop);

export default {
  onStateChange: subscriber =>
    playbackStateSubscribers.push(subscriber),

  pause: () =>
    Tone.pauseTransport(),

  previewNote: (name, length, time) =>
    instrument.playNote(name, length, time),

  start: () =>
    Tone.startTransport(),

  stop: () =>
    Tone.stopTransport(),
};

function handlePause() {
  forEach(
    S.T(constants.playbackStates.PAUSED),
    playbackStateSubscribers,
  );
}

function handleStart() {
  forEach(
    S.T(constants.playbackStates.STARTED),
    playbackStateSubscribers,
  );
}

function handleStop() {
  forEach(
    S.T(constants.playbackStates.STOPPED),
    playbackStateSubscribers,
  );
}
