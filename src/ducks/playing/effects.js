import _ from 'lodash';
import Tone from 'tone';
import shared from 'ducks/shared';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function clearActiveSynths() {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());
    tracks.forEach(t => dispatch(setTrackActiveSynths([], t.id)));
  };
}

export function disposeAll() {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());

    const activeSynths = _.flatMap(tracks, 'activeSynths');
    const synths = _.flatMap(tracks, 'synths');

    const allSynths = [
      ...activeSynths,
      ...synths,
    ];

    dispatch(clearActiveSynths());
    allSynths.forEach(s => s.dispose());
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(updateTracks());
  };
}

export function playNote(point) {
  return (dispatch, getState) => {
    const activeSequence = song.selectors.getActiveSequence(getState());
    const trackId = activeSequence.trackId;
    const previewSynth = selectors.getPreviewSynthByTrackId(trackId)(getState());

    previewSynth.triggerAttackRelease(
      shared.helpers.getNoteName(point.y),
      '16n',
    );
  };
}

export function playNoteOnSequence(note, time, length, trackId) {
  return (dispatch) => {
    const synth = dispatch(popSynth(trackId));

    if (!synth) {
      console.log(`Track ${trackId} synths unavailable`);
      return;
    }

    const name = shared.helpers.getNoteName(_.first(note.points).y);

    synth.triggerAttack(name, time);

    if (_.last(note.points).y !== _.first(note.points).y) {
      const endName = shared.helpers.getNoteName(_.last(note.points).y);
      synth.frequency.linearRampToValueAtTime(endName, `+${length}`);
      synth.frequency.setValueAtTime(endName, `+${length}`);
    }


    Tone.Transport.scheduleOnce(() => {
      synth.triggerRelease();
      dispatch(pushSynth(synth, trackId));
    }, `+(${length} - 0:0:0.1)`);
  };
}

export function popSynth(trackId) {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynthsByTrackId(trackId)(getState());
    const synths = selectors.getSynthsByTrackId(trackId)(getState());
    const synth = synths[0];

    if (!synth) {
      return undefined;
    }

    dispatch(setTrackActiveSynths([
      ...activeSynths,
      synth,
    ], trackId));
    dispatch(setSynths(_.without(synths, synth), trackId));

    return synth;
  };
}

export function pushSynth(synth, trackId) {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynthsByTrackId(trackId)(getState());

    if (!_.includes(activeSynths, synth)) return;

    const synths = selectors.getSynthsByTrackId(trackId)(getState());

    dispatch(setTrackActiveSynths(_.without(activeSynths, synth), trackId));
    dispatch(setSynths([
      ...synths,
      synth,
    ], trackId));
  };
}

export function releaseAll() {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());

    tracks.forEach(track => {
      const activeSynths = track.activeSynths;
      const synths = track.synths;
      const updatedTrack = {
        ...track,
        activeSynths: [],
        synths: [
          ...activeSynths,
          ...synths,
        ],
      };

      activeSynths.forEach(s => {
        s.triggerRelease();
      });
      synths.forEach(s => {
        s.triggerRelease();
      });

      dispatch(updateTrack(updatedTrack));
    });
  };
}

export function setTrackActiveSynths(activeSynths, trackId) {
  return (dispatch, getState) => {
    const track = selectors.getTrackById(trackId)(getState());
    const updatedTrack = {
      ...track,
      activeSynths,
    };

    dispatch(updateTrack(updatedTrack));
  };
}

export function setSynths(synths, trackId) {
  return (dispatch, getState) => {
    const track = selectors.getTrackById(trackId)(getState());
    const updatedTrack = {
      ...track,
      synths,
    };

    dispatch(updateTrack(updatedTrack));
  };
}

export function updateTrack(track) {
  return {
    type: actionTypes.UPDATE_TRACK,
    track,
  };
}

export function updateTracks() {
  return (dispatch, getState) => {
    const songTracks = song.selectors.getTracks(getState());
    const tracks = songTracks.map(songTrack => ({
      id: songTrack.id,
      activeSynths: [],
      previewSynth: helpers.createSynth(songTrack.synthType),
      synths: helpers.createSynths(songTrack.synthType),
    }));

    dispatch(actions.setTracks(tracks));
  };
}
