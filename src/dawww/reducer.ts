import instrumentsReducer from './instruments/reducer';
import partsReducer from './parts/reducer';
import playbackStateReducer from './playbackState/reducer';
import positionReducer from './position/reducer';
import songReducer from './song/reducer';
import transportPartReducer from './transportPart/reducer';
import { DawwwReducer } from './types';
import { volumeNodesReducer } from './volumeNodes/reducer';

export const reducer: DawwwReducer = (state, action, shared) => {
  return {
    instruments: instrumentsReducer(state.instruments, action, shared),
    parts: partsReducer(state.parts, action, shared),
    playbackState: playbackStateReducer(state.playbackState, action),
    position: positionReducer(state.position, action),
    song: songReducer(state.song, action),
    transportPart: transportPartReducer(state.transportPart, action, shared),
    volumeNodes: volumeNodesReducer(state.volumeNodes, action, shared),
  };
};
