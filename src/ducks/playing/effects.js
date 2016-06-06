import _ from 'lodash';
import Tone from 'tone';
import shared from 'ducks/shared';
import song from 'ducks/song';
import * as actions from './actions';
import * as selectors from './selectors';

export function playNote(point) {
  return (dispatch, getState) => {
    const activeSequence = song.selectors.getActiveSequence(getState());
    const channelId = activeSequence.trackId;
    const previewSynth = selectors.getPreviewSynthByChannelId(channelId)(getState());

    previewSynth.triggerAttackRelease(
      shared.helpers.getNoteName(point.y),
      '16n',
    );
  };
}

export function playNoteOnSequence(note, time, length, channelId) {
  return (dispatch) => {
    const synth = dispatch(popSynth(channelId));

    if (!synth) {
      console.log(`Channel ${channelId} synths unavailable`);
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
      if (synth) synth.triggerRelease();
      dispatch(pushSynth(synth, channelId));
    }, `+(${length} - 0:0:0.1)`);
  };
}

export function popSynth(channelId) {
  return (dispatch, getState) => {
    const channel = selectors.getChannelById(channelId)(getState());
    const synth = channel.synths[0];

    if (!synth) {
      return undefined;
    }

    dispatch(actions.updateChannel({
      ...channel,
      activeSynths: _.concat(channel.activeSynths, synth),
      synths: _.without(channel.synths, synth),
    }));

    return synth;
  };
}

export function pushSynth(synth, channelId) {
  return (dispatch, getState) => {
    const activeSynths = selectors.getActiveSynthsByChannelId(channelId)(getState());

    if (!_.includes(activeSynths, synth)) return;

    const synths = selectors.getSynthsByChannelId(channelId)(getState());

    dispatch(setChannelActiveSynths(_.without(activeSynths, synth), channelId));
    dispatch(setSynths([
      ...synths,
      synth,
    ], channelId));
  };
}

export function setChannelActiveSynths(activeSynths, channelId) {
  return (dispatch, getState) => {
    const channel = selectors.getChannelById(channelId)(getState());
    const updatedChannel = {
      ...channel,
      activeSynths,
    };

    dispatch(actions.updateChannel(updatedChannel));
  };
}

function setSynths(synths, channelId) {
  return (dispatch, getState) => {
    const channel = selectors.getChannelById(channelId)(getState());
    const updatedChannel = {
      ...channel,
      synths,
    };

    dispatch(actions.updateChannel(updatedChannel));
  };
}
