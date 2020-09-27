import { createReducer } from 'redux-starter-kit';

import Dawww from '../../../dawww';
import * as actions from '../actions';

export default createReducer(Dawww.PLAYBACK_STATES.STOPPED, {
  [actions.playbackStateRequestSucceeded.type]: (state, action) =>
    action.payload,
});
