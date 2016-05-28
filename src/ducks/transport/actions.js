import _ from 'lodash';
import Tone from 'tone';
import notes from 'ducks/notes';
import sequencer from 'ducks/sequencer';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';
import * as constants from './constants';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function createSequence() {
  return (dispatch, getState) => {
    const toneSequence = new Tone.Sequence((time, step) => {
      const allNotes = notes.selectors.getNotes(getState());
      const notesAtStep = _(allNotes)
        .filter(note => _.first(note.points).x === step)
        .uniqBy(note => _.first(note.points).y)
        .value();

      notesAtStep.forEach((note) => dispatch(playNoteAtStep(note, time)));

      dispatch(setPosition(step));
    }, _.range(sequencer.selectors.getMeasureCount(getState()) * 32), '32n');

    toneSequence.start();
  };
}

export function disposeAll() {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynths(getState());
    const synths = selectors.getSynths(getState());

    const allSynths = [...activeSynths, ...synths];

    dispatch(setActiveSynths([]));
    allSynths.forEach(s => s.dispose());
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(createSequence());
    dispatch(setTransportBPM(constants.defaultBPM));
  };
}

export function pause() {
  return (dispatch) => {
    dispatch(setPlaybackState(constants.playbackStates.PAUSED));
    dispatch(releaseAll());
    Tone.Transport.pause();
  };
}

export function play() {
  return (dispatch) => {
    dispatch(setPlaybackState(constants.playbackStates.STARTED));
    Tone.Transport.start();
  };
}

export function playNote(point) {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynths(getState());
    const synths = selectors.getSynths(getState());
    const synth = synths[0];
    const name = shared.helpers.getNoteName(point.y);

    if (!synth) {
      return;
    }

    dispatch(setActiveSynths([
      ...activeSynths,
      synth,
    ]));
    dispatch(setSynths(_.without(synths, synth)));

    synth.triggerAttack(name);
    synth.triggerRelease('+0.15');

    setTimeout(() => {
      dispatch(pushSynth(synth));
    }, 150);
  };
}

export function playNoteAtStep(note, time) {
  return (dispatch, getState) => {
    const synth = dispatch(popSynth());
    if (!synth) return;

    const bpm = selectors.getBpm(getState());
    const length = notes.helpers.sizeToSeconds(_.last(note.points).x - _.first(note.points).x, bpm);
    const name = shared.helpers.getNoteName(_.first(note.points).y);

    synth.triggerAttack(name, time);

    if (_.last(note.points).y !== _.first(note.points).y) {
      const endName = shared.helpers.getNoteName(_.last(note.points).y);
      synth.frequency.linearRampToValueAtTime(endName, `+${length}`);
      synth.frequency.setValueAtTime(endName, `+${length}`);
    }

    synth.triggerRelease(`+${length}`);

    Tone.Transport.scheduleOnce(() => {
      dispatch(pushSynth(synth));
    }, `+${length}`);
  };
}

export function popSynth() {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynths(getState());
    const synths = selectors.getSynths(getState());
    const synth = synths[0];

    if (!synth) {
      return undefined;
    }

    dispatch(setActiveSynths([
      ...activeSynths,
      synth,
    ]));
    dispatch(setSynths(_.without(synths, synth)));

    return synth;
  };
}

export function pushSynth(synth) {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynths(getState());

    if (!_.includes(activeSynths, synth)) return;

    const synths = selectors.getSynths(getState());

    dispatch(setActiveSynths(_.without(activeSynths, synth)));
    dispatch(setSynths([
      ...synths,
      synth,
    ]));
  };
}

export function releaseAll() {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynths(getState());
    const synths = selectors.getSynths(getState());
    activeSynths.forEach(s => {
      s.triggerRelease();
    });
    synths.forEach(s => {
      s.triggerRelease();
    });
    dispatch(setSynths([
      ...activeSynths,
      ...synths,
    ]));
    dispatch(setActiveSynths([]));
  };
}

export function setActiveSynths(activeSynths) {
  return {
    type: actionTypes.SET_ACTIVE_SYNTHS,
    activeSynths,
  };
}

export function setBPM(bpm) {
  return {
    type: actionTypes.SET_BPM,
    bpm,
  };
}

export function setPlaybackState(playbackState) {
  return {
    type: actionTypes.SET_PLAYBACK_STATE,
    playbackState,
  };
}

export function setPosition(position) {
  return {
    type: actionTypes.SET_POSITION,
    position,
  };
}

export function setSynths(synths) {
  return {
    type: actionTypes.SET_SYNTHS,
    synths,
  };
}

export function setTransportBPM(bpm) {
  return (dispatch) => {
    Tone.Transport.bpm.value = bpm;
    dispatch(setBPM(bpm));
  };
}

export function stop() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());

    if (playbackState === constants.playbackStates.STOPPED) return;

    dispatch(setPlaybackState(constants.playbackStates.STOPPED));
    dispatch(setPosition(0));
    dispatch(releaseAll());
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

export function updateSynths(synthType) {
  return (dispatch) => {
    const newSynths = helpers.createSynths(synthType);

    dispatch(disposeAll());
    dispatch(setSynths(newSynths));
  };
}
