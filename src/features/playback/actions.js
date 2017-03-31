import { NAME } from './constants';

export const ALL_INSTRUMENTS_RELEASED = `${NAME}/ALL_INSTRUMENTS_RELEASED`;
export const CHANNEL_ADDED = `${NAME}/CHANNEL_ADDED`;
export const CHANNELS_SET = `${NAME}/CHANNELS_SET`;
export const INSTRUMENT_DISPOSED = `${NAME}/INSTRUMENT_DISPOSED`;
export const NOTE_PLAYED = `${NAME}/NOTE_PLAYED`;
export const NOTE_PREVIEWED = `${NAME}/NOTE_PREVIEWED`;


export const allInstrumentsReleased = () => ({
  type: ALL_INSTRUMENTS_RELEASED,
});

export const channelAdded = channel => ({
  type: CHANNEL_ADDED,
  channel,
});

export const channelsSet = channels => ({
  type: CHANNELS_SET,
  channels,
});

export const instrumentDisposed = channel => ({
  type: INSTRUMENT_DISPOSED,
  channel,
});

export const notePlayed = payload => ({
  type: NOTE_PLAYED,
  payload,
});

export const notePreviewed = point => ({
  type: NOTE_PREVIEWED,
  payload: point,
});
