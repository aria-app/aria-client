import invoke from 'lodash/fp/invoke';
import range from 'lodash/fp/range';
import without from 'lodash/fp/without';
import * as constants from '../constants';
import * as helpers from '../helpers';
import Instrument from '../instrument';
import { createPlaybackSequence } from '../PlaybackSequence';
import Tone from '../tone';

class Server {
  instrument = Instrument.create('a', 'square');
  playbackSequenceDict = {};
  playbackSequenceIds = [];
  playbackStateSubscribers = [];
  positionSubscribers = [];
  songPart = {};

  constructor() {
    Tone.onPause(this.handlePause);
    Tone.onStart(this.handleStart);
    Tone.onStop(this.handleStop);
  }

  addPlaybackSequence = (playbackSequence) => {
    this.playbackSequenceDict = {
      ...this.playbackSequenceDict,
      [playbackSequence.id]: playbackSequence,
    };

    this.playbackSequenceIds = [
      ...this.playbackSequenceIds,
      playbackSequence.id,
    ];
  };

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
    Tone.pauseTransport();
  }

  playNote = (name, length, time) =>
    this.instrument.playNote(name, length, time);

  postSequence = (sequence, notes) => {
    const playbackSequence = createPlaybackSequence(sequence, notes, this);

    this.addPlaybackSequence(playbackSequence);
  };

  postSong = (song) => {
    const end = helpers.measuresToTime(song.measureCount);

    // eslint-disable-next-line lodash-fp/no-unused-result
    invoke('songPart.dispose', this);

    this.songPart = Tone.createPart(
      () => {},
      range(0, song.measureCount * 32),
      '32n',
    );

    this.songPart.start(0);
    Tone.setTransportLoopPoints('0', end);
    Tone.setTransportLoop(true);
  };

  start = () =>
    Tone.startTransport();

  stop = () => {
    Tone.stopTransport();
  };

  updatePlaybackSequence = (playbackSequence) => {
    this.playbackSequenceDict[playbackSequence.id].part.dispose();

    this.playbackSequenceDict = {
      [playbackSequence.id]: playbackSequence,
    };

    this.playbackSequenceIds = [
      ...without([playbackSequence.id], this.playbackSequenceIds),
      playbackSequence.id,
    ];
  };

  updateSequence = (sequence, notes) => {
    const playbackSequence = createPlaybackSequence(sequence, notes, this);

    this.updatePlaybackSequence(playbackSequence);
  };
}

Server.create = () => new Server();

export default Server;
