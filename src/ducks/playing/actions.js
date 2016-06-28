import shared from 'ducks/shared';
import * as actionTypes from './action-types';

export function allInstrumentsReleased() {
  return {
    type: actionTypes.ALL_INSTRUMENTS_RELEASED,
  };
}

export function channelAdded(channel) {
  return {
    type: actionTypes.CHANNEL_ADDED,
    channel,
  };
}

export function channelUpdated(channel) {
  return {
    type: actionTypes.channelUpdated,
    channel,
  };
}

export function channelsSet(channels) {
  return {
    type: actionTypes.CHANNELS_SET,
    channels,
  };
}

export function instrumentDisposed(channel) {
  return {
    type: actionTypes.INSTRUMENT_DISPOSED,
    channel,
  };
}

export function notePlayed(payload) {
  return {
    type: actionTypes.NOTE_PLAYED,
    payload,
  };
}

export function notePreviewed(point) {
  return {
    type: actionTypes.NOTE_PREVIEWED,
    name: shared.helpers.getNoteName(point.y),
  };
}
