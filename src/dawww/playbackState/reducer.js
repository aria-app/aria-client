import * as actions from '../actions';

export default function reducer(state = 'STOPPED', action) {
  switch (action.type) {
    case actions.PLAYBACK_STATE_SET:
      return action.payload.playbackState;
    default:
      return state;
  }
}
