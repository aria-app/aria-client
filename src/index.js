import React, { createElement } from 'react';
import whyDidYouUpdate from 'why-did-you-update';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import app from 'ducks/app';
import shortcuts from 'ducks/shortcuts';
import transport from 'ducks/transport';
import reducer from './reducer';
import './styles/resets.scss';

const { App } = app.components;

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

store.dispatch(shortcuts.actions.initialize());
store.dispatch(transport.actions.initialize());

whyDidYouUpdate(React, { exclude: /^(Connect|pure|withHandlers|withState)/ });

render(
  createElement(Provider, {
    store,
  }, createElement(App)),
  document.querySelector('#zen-app-root')
);
