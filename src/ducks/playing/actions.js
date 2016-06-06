import shared from 'ducks/shared';
import * as actionTypes from './action-types';

export function addChannel(channel) {
  return {
    type: actionTypes.ADD_CHANNEL,
    channel,
  };
}

export function playNote(payload) {
  return {
    type: actionTypes.PLAY_NOTE,
    payload,
  };
}

export function popSynth(synth, channelId) {
  return {
    type: actionTypes.POP_SYNTH,
    channelId,
    synth,
  };
}

export function previewNote(point) {
  return {
    type: actionTypes.PREVIEW_NOTE,
    name: shared.helpers.getNoteName(point.y),
  };
}

export function pushSynth(synth, channelId) {
  return {
    type: actionTypes.PUSH_SYNTH,
    channelId,
    synth,
  };
}

export function releaseAll() {
  return {
    type: actionTypes.RELEASE_ALL,
  };
}

export function setChannels(channels) {
  return {
    type: actionTypes.SET_CHANNELS,
    channels,
  };
}

export function updateChannel(channel) {
  return {
    type: actionTypes.UPDATE_CHANNEL,
    channel,
  };
}

export function updateChannels(channels) {
  return {
    type: actionTypes.UPDATE_CHANNELS,
    channels,
  };
}
