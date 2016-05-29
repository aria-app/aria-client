import _ from 'lodash';
import Tone from 'tone';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function disposeAll() {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynths(getState());
    const synths = selectors.getSynths(getState());

    const allSynths = [...activeSynths, ...synths];

    dispatch(setActiveSynths([]));
    allSynths.forEach(s => s.dispose());
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

export function playNoteAtStep(note, time, length) {
  return (dispatch) => {
    const synth = dispatch(popSynth());
    if (!synth) return;

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

export function setSynths(synths) {
  return {
    type: actionTypes.SET_SYNTHS,
    synths,
  };
}

export function updateSynths(synthType) {
  return (dispatch) => {
    const newSynths = helpers.createSynths(synthType);

    dispatch(disposeAll());
    dispatch(setSynths(newSynths));
  };
}
