import 'babel-polyfill';
import React from 'react';
// import whyDidYouUpdate from 'why-did-you-update';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import app from 'ducks/app';
import reducer from './reducer';
import song from 'ducks/song';
import rootSaga from './sagas';
import sampleProject from './sample-project';
import './styles/resets.scss';

const { AppContainer } = app.components;

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  sagaMiddleware,
  thunkMiddleware
);

const store = createStore(reducer, middleware);
sagaMiddleware.run(rootSaga);
store.dispatch(song.actions.loadProject(sampleProject));

// whyDidYouUpdate(React, { exclude: /^(Connect|pure|withHandlers|withState)/ });

render(
  React.createElement(Provider, {
    store,
  }, React.createElement(AppContainer)),
  document.querySelector('#zen-app-root')
);
