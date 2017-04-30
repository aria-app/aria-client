import range from 'lodash/fp/range';
import Tone from 'tone';
import * as constants from '../constants';
import Instrument from '../instrument';
import { createSequence } from '../Sequence';

class Server {
  playbackStateSubscribers = [];
  positionSubscribers = [];
  previewInstrument = Instrument.create('a', 'square');

  constructor() {
    Tone.Transport.on('pause', this.handlePause);
    Tone.Transport.on('start', this.handleStart);
    Tone.Transport.on('stop', this.handleStop);
    const sequence = new Tone.Sequence(() => {
      // console.log('time', time);
      // console.log('step', step);
    }, range(0, 32), '32n');
    sequence.start(0);
  }

  handlePause = () => {
    this.playbackStateSubscribers.forEach(sub =>
      sub(constants.playbackStates.PAUSED),
    );
  };

  handleStart = () => {
    this.playbackStateSubscribers.forEach(sub =>
      sub(constants.playbackStates.STARTED),
    );
  };

  handleStop = () => {
    this.playbackStateSubscribers.forEach(sub =>
      sub(constants.playbackStates.STOPPED),
    );
  };

  onPlaybackStateChange = (fn) => {
    this.playbackStateSubscribers = [
      ...this.playbackStateSubscribers,
      fn,
    ];
  };

  pause = () => {
    Tone.Transport.pause();
  }

  playNote = (...args) =>
    this.previewInstrument.playNote(...args);

  postSequence = (sequence, notes) =>
    createSequence(sequence, notes);

  start = () =>
    Tone.Transport.start();

  stop = () => {
    Tone.Transport.stop();
  };
}

Server.create = () => new Server();

export default Server;
