import forEach from 'lodash/fp/forEach';
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
    cb => cb(constants.playbackStates.PAUSED),
    playbackStateSubscribers,
  );
}

function handleStart() {
  forEach(
    cb => cb(constants.playbackStates.STARTED),
    playbackStateSubscribers,
  );
}

function handleStop() {
  forEach(
    cb => cb(constants.playbackStates.STOPPED),
    playbackStateSubscribers,
  );
}
