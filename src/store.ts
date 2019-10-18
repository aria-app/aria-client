import { combineReducers } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import { configureStore } from 'redux-starter-kit';
import audio from './features/audio';
import shared from './features/shared';
import song from './features/song';
import user from './features/user';

export default configureStore({
  devTools: {
    actionsBlacklist: [shared.actions.POSITION_REQUEST_SUCCEEDED],
  },
  middleware: [
    createLogicMiddleware([...audio.logic, ...song.logic, ...user.logic]),
  ],
  reducer: combineReducers({
    [audio.constants.NAME]: audio.reducer,
    [song.constants.NAME]: song.reducer,
    [user.constants.NAME]: user.reducer,
  }),
});
