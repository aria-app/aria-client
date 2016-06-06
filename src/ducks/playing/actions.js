import * as actionTypes from './action-types';

export function addChannel(channel) {
  return {
    type: actionTypes.ADD_CHANNEL,
    channel,
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
