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
    const toneSequences = songSequences.map(sequence => {
      const toneSequence = new Tone.Sequence((time, step) => {
        const activeSequenceId = song.selectors.getActiveSequenceId(getState());
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

        if (activeSequenceId !== sequence.id) return;

        dispatch(actions.setPosition(step));
      }, _.range(sequence.measureCount * 32), '32n');

      toneSequence.loop = false;

      toneSequence.start(`+${helpers.measuresToSeconds(sequence.position)}`);

      return toneSequence;
    });

    if (!Tone.Transport.loop) {
      dispatch(loopSong());
    }

    dispatch(actions.setSequences(toneSequences));
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(updateSequences());
    dispatch(updateBPM());
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
    const sequences = song.selectors.getSequences(getState());
    const maxMeasureCount = _.max(_.map(sequences, 'measureCount'));
    const end = helpers.measuresToSeconds(maxMeasureCount);
    dispatch(actions.setStartPoint(0));
    Tone.Transport.setLoopPoints(0, end);
    Tone.Transport.loop = true;
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
      Tone.Transport.start(null, startPoint);
    } else {
      Tone.Transport.start(null);
    }
  };
}

export function updateBPM() {
  return (dispatch, getState) => {
    const bpm = song.selectors.getBPM(getState());

    Tone.Transport.bpm.value = bpm;
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
