import _ from 'lodash';
import Tone from 'tone';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as constants from './constants';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function createSequences() {
  return (dispatch, getState) => {
    const songSequences = song.selectors.getSequences(getState());
    const toneSequences = songSequences.map(sequence => {
      const toneSequence = new Tone.Sequence((time, step) => {
        const activeSequenceId = song.selectors.getActiveSequenceId(getState());
        const notes = song.selectors.getNotesBySequenceId(sequence.id)(getState());
        const notesAtStep = _(notes)
          .filter(note => _.first(note.points).x === step)
          .uniqBy(note => _.first(note.points).y)
          .value();

        notesAtStep.forEach((note) => {
          dispatch(playing.actions.playNote({
            channelId: sequence.trackId,
            note,
            time,
          }));
        });

        if (activeSequenceId !== sequence.id) return;

        dispatch(actions.setPosition(step));
      }, _.range(sequence.measureCount * 32), '32n');

      toneSequence.loop = false;

      toneSequence.start(`${helpers.measuresToSeconds(sequence.position)}`);

      return toneSequence;
    });

    dispatch(actions.setSequences(toneSequences));
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(updateSequences());
    dispatch(updateLooping());
  };
}

export function loopActiveSequence() {
  return (dispatch, getState) => {
    const { measureCount, position } = song.selectors.getActiveSequence(getState());
    const start = helpers.measuresToSeconds(position);
    const end = helpers.measuresToSeconds(position + measureCount);
    dispatch(actions.setStartPoint(`+${start}`));
    Tone.Transport.setLoopPoints(start, end);
    Tone.Transport.loop = true;
  };
}

export function loopSong() {
  return (dispatch, getState) => {
    const songMeasureCount = song.selectors.getMeasureCount(getState());
    const end = helpers.measuresToSeconds(songMeasureCount);
    dispatch(actions.setStartPoint(0));
    Tone.Transport.setLoopPoints(0, end);
    Tone.Transport.loop = true;
  };
}

export function pause() {
  return {
    type: actionTypes.PAUSE,
  };
}

export function play() {
  return {
    type: actionTypes.PLAY,
  };
}

export function stop() {
  return {
    type: actionTypes.STOP,
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

export function updateLooping() {
  return (dispatch, getState) => {
    const activeSequenceId = song.selectors.getActiveSequenceId(getState());
    const playbackState = selectors.getPlaybackState(getState());

    if (activeSequenceId) {
      dispatch(loopActiveSequence());
    } else {
      dispatch(loopSong());
    }

    dispatch(stop());

    if (playbackState === constants.playbackStates.STARTED) {
      setTimeout(() => dispatch(play()), 500);
    }
  };
}

export function updateSequences() {
  return (dispatch, getState) => {
    const sequences = selectors.getSequences(getState());

    sequences.forEach(s => s.dispose());

    dispatch(createSequences());
    dispatch(updateLooping());
  };
}
