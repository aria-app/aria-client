import _ from 'lodash';
import Tone from 'tone';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as actions from './actions';
import * as constants from './constants';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function createSequences() {
  return (dispatch, getState) => {
    const songSequences = song.selectors.getSequences(getState());
    const maxMeasureCount = _.max(_.map(songSequences, 'measureCount'));
    const toneSequences = songSequences.map(sequence => {
      const toneSequence = new Tone.Sequence((time, step) => {
        const getNotes = song.selectors.createGetNotesById(sequence.id);
        const allNotes = getNotes(getState());
        const notesAtStep = _(allNotes)
          .filter(note => _.first(note.points).x === step)
          .uniqBy(note => _.first(note.points).y)
          .value();

        notesAtStep.forEach((note) => {
          const length = helpers.sizeToSeconds(_.last(note.points).x - _.first(note.points).x);
          dispatch(playing.effects.playNoteOnSequence(note, time, length, sequence.trackId));
        });

        dispatch(actions.setPosition(step));
      }, _.range(sequence.measureCount * 32), '32n');

      toneSequence.loop = false;

      toneSequence.start(`+${helpers.measuresToSeconds(sequence.position)}`);

      return toneSequence;
    });

    if (!Tone.Transport.loop) {
      const endTime = helpers.measuresToSeconds(maxMeasureCount);
      Tone.Transport.loop = true;
      Tone.Transport.setLoopPoints(0, `+${endTime}`);
    }

    dispatch(actions.setSequences(toneSequences));
  };
}

export function loopActiveSequence() {
  return (dispatch, getState) => {
    const { measureCount, position } = song.selectors.getActiveSequence(getState());
    const start = helpers.measuresToSeconds(position);
    const end = helpers.measuresToSeconds(position + measureCount);
    console.log('start', start);
    console.log('end', end);
    dispatch(actions.setStartPoint(`+${start}`));
    Tone.Transport.setLoopPoints(start, end);
    Tone.Transport.loop = true;
  };
}

export function loopSong() {
  return (dispatch, getState) => {
    const sequences = song.selectors.getSequences(getState());
    const maxMeasureCount = _.max(_.map(sequences, 'measureCount'));
    const start = 0;
    const end = helpers.measuresToSeconds(maxMeasureCount);
    Tone.Transport.setLoopPoints(start, end);
  };
}

export function pause() {
  return (dispatch) => {
    dispatch(actions.setPlaybackState(constants.playbackStates.PAUSED));
    dispatch(playing.effects.releaseAll());
    Tone.Transport.pause();
  };
}

export function play() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());

    dispatch(actions.setPlaybackState(constants.playbackStates.STARTED));

    if (playbackState === constants.playbackStates.STOPPED) {
      const startPoint = selectors.getStartPoint(getState());
      console.log('Start Point', startPoint);
      Tone.Transport.start(0, startPoint);
    } else {
      Tone.Transport.start(0, 0);
    }
  };
}

export function stop() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());

    if (playbackState === constants.playbackStates.STOPPED) return;

    dispatch(actions.setPlaybackState(constants.playbackStates.STOPPED));
    dispatch(actions.setPosition(0));
    dispatch(playing.effects.releaseAll());
    Tone.Transport.stop();
  };
}

export function togglePlayPause() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());

    if (playbackState !== constants.playbackStates.STARTED) {
      dispatch(play());
    } else {
      dispatch(pause());
    }
  };
}

export function updateSequences() {
  return (dispatch, getState) => {
    const sequences = selectors.getSequences(getState());

    sequences.forEach(s => s.dispose());

    dispatch(createSequences());
  };
}
