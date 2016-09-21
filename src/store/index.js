// @flow
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import shared from '../features/shared';
import song from '../features/song';
import loggerMiddleware from './logger-middleware';
import reducer from './reducer';
import saga from './saga';
import sampleSong from './sample-song';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  loggerMiddleware,
  sagaMiddleware
);

const store = createStore(reducer, middleware);

sagaMiddleware.run(saga);

const localStorageSong = localStorage.getItem(
  shared.constants.localStorageKey
);

const initialSong = localStorageSong
  ? JSON.parse(localStorageSong)
  : sampleSong;

store.dispatch(song.actions.songLoaded(initialSong));

export default store;
