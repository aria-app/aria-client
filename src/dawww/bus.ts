import getEventEmitter from 'event-emitter';

const eventEmitter = getEventEmitter();

export const channels = {
  ACTION_OCCURRED: 'ACTION_OCCURRED',
  PLAYBACK_STATE_SET: 'PLAYBACK_STATE_SET',
  POSITION_SET: 'POSITION_SET',
  UPDATE_REQUESTED: 'UPDATE_REQUESTED',
};

type PartiallyAppliedEmit = (channelName: string) => (payload: any) => void;

export const emit: PartiallyAppliedEmit = (channelName) => (payload) => {
  eventEmitter.emit(channelName, payload);
};

type OnFn = (
  channelName: string,
  callback: getEventEmitter.EventListener,
) => void;

export const on: OnFn = (channelName, callback) => {
  eventEmitter.on(channelName, callback);
};
