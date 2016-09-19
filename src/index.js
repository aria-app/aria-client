// @flow
import 'babel-polyfill';
import h from 'react-hyperscript';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import app from './ducks/app';
import reducer from './reducer';
import shared from './ducks/shared';
import song from './ducks/song';
import rootSaga from './sagas';
import sampleSong from './sample-song';
import './styles/resets.scss';

const { AppContainer } = app.components;

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  sagaMiddleware
);

const store = createStore(reducer, middleware);
sagaMiddleware.run(rootSaga);

const localStorageSong = localStorage.getItem(
  shared.constants.localStorageKey
);

const initialSong = localStorageSong
  ? JSON.parse(localStorageSong)
  : sampleSong;

// eslint-disable-next-line no-console
console.log('Initial Song', initialSong);

store.dispatch(song.actions.songLoaded(initialSong));


render(
  h(Provider, {
    store,
  }, h(AppContainer)),
  document.querySelector('#zen-app-root')
);
