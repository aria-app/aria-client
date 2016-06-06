import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

export const getChannelsById = state => get(state).channels.byId;
export const getChannelsIds = state => get(state).channels.ids;

export const getChannels = (state) =>
  getChannelsIds(state).map(id => getChannelsById(state)[id]);

export const getChannelById = (id) => (state) =>
  getChannelsById(state)[id];

export const getAllSynths = (state) =>
  _.flatMap(getChannels(state), channel => [
    ...channel.activeSynths,
    ...channel.synths,
  ]);

export const getActiveSynthsByChannelId = (id) => (state) => {
  const channel = getChannelById(id)(state);
  return channel ? channel.activeSynths : undefined;
};

export const getPreviewSynthByChannelId = (id) => (state) => {
  const channel = getChannelById(id)(state);
  return channel ? channel.previewSynth : undefined;
};

export const getSynthsByChannelId = (id) => (state) => {
  const channel = getChannelById(id)(state);
  return channel ? channel.synths : undefined;
};
