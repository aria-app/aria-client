import { flow, get, map } from 'lodash/fp';
import { NAME } from './constants';

export const getChannelsById = state => get('channels.byId')(state[NAME]);
export const getChannelsIds = state => get('channels.ids')(state[NAME]);

export const getChannelById = id => state =>
  flow(
    getChannelsById,
    get(id),
  )(state);

export const getChannels = state =>
  flow(
    getChannelsIds,
    map(id => getChannelById(id)(state)),
  )(state);

export const getPreviewInstrumentByChannelId = id =>
  flow(
    getChannelById(id),
    get('previewInstrument'),
  );

export const getPreviewSynthByChannelId = id =>
  flow(
    getChannelById(id),
    get('previewSynth'),
  );
