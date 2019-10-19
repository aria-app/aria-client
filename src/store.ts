import { combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { configureStore } from 'redux-starter-kit';
import audio from './features/audio';
import song from './features/song';
import user from './features/user';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  devTools: {
    actionsBlacklist: [audio.actions.positionRequestSucceeded.type],
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
