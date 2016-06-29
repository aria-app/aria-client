import { NAME } from './constants';

const get = state => state[NAME];

export const getChannelsById = state => get(state).channels.byId;
export const getChannelsIds = state => get(state).channels.ids;

export const getChannels = state =>
  getChannelsIds(state).map(id => getChannelsById(state)[id]);

export const getChannelById = (id) => state =>
  getChannelsById(state)[id];

export const getPreviewInstrumentByChannelId = (id) => state => {
  const channel = getChannelById(id)(state);
  return channel ? channel.previewInstrument : undefined;
};

export const getPreviewSynthByChannelId = (id) => state => {
  const channel = getChannelById(id)(state);
  return channel ? channel.previewSynth : undefined;
};
