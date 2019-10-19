import { combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { configureStore } from 'redux-starter-kit';
import audio from './features/audio';
import shared from './features/shared';
import song from './features/song';
import user from './features/user';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  devTools: {
    actionsBlacklist: [shared.actions.POSITION_REQUEST_SUCCEEDED],
  },
  middleware: [epicMiddleware],
  reducer: combineReducers({
    audio: audio.reducer,
    song: song.reducer,
    user: user.reducer,
  }),
});

epicMiddleware.run(combineEpics(audio.epic, song.epic, user.epic));

export default store;
