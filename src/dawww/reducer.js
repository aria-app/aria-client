import instrumentsReducer from './instruments/reducer';
import partsReducer from './parts/reducer';
import songReducer from './song/reducer';
import transportPartReducer from './transportPart/reducer';
import volumeNodesReducer from './volumeNodes/reducer';

export default function reducer(state, ...rest) {
  return {
    instruments: instrumentsReducer(state.instruments, ...rest),
    parts: partsReducer(state.parts, ...rest),
    song: songReducer(state.song, ...rest),
    transportPart: transportPartReducer(state.transportPart, ...rest),
    volumeNodes: volumeNodesReducer(state.volumeNodes, ...rest),
  };
}
