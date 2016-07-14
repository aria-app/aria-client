import shared from 'ducks/shared';
import * as actionTypes from './action-types';

export const allInstrumentsReleased = () => ({
  type: actionTypes.ALL_INSTRUMENTS_RELEASED,
});

export const channelAdded = channel => ({
  type: actionTypes.CHANNEL_ADDED,
  channel,
});

export const channelsSet = channels => ({
  type: actionTypes.CHANNELS_SET,
  channels,
});

export const instrumentDisposed = channel => ({
  type: actionTypes.INSTRUMENT_DISPOSED,
  channel,
});

export const notePlayed = payload => ({
  type: actionTypes.NOTE_PLAYED,
  payload,
});

export const notePreviewed = point => ({
  type: actionTypes.NOTE_PREVIEWED,
  name: shared.helpers.getNoteName(point.y),
});
