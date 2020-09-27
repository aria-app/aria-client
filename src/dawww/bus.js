import getEventEmitter from 'event-emitter';

const eventEmitter = getEventEmitter();

export const channels = {
  ACTION_OCCURRED: 'ACTION_OCCURRED',
  PLAYBACK_STATE_SET: 'PLAYBACK_STATE_SET',
  POSITION_SET: 'POSITION_SET',
  UPDATE_REQUESTED: 'UPDATE_REQUESTED',
};

export const emit = (channelName) => (payload) => {
  eventEmitter.emit(channelName, payload);
};

export const on = (channelName, callback) => {
  eventEmitter.on(channelName, callback);
};
