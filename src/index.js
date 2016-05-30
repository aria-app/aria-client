import React from 'react';
// import whyDidYouUpdate from 'why-did-you-update';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import app from 'ducks/app';
import reducer from './reducer';
import './styles/resets.scss';

const { AppContainer } = app.components;

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

// whyDidYouUpdate(React, { exclude: /^(Connect|pure|withHandlers|withState)/ });

render(
  React.createElement(Provider, {
    store,
  }, React.createElement(AppContainer)),
  document.querySelector('#zen-app-root')
);
