import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import appEffects from './features/app';
import shared from './features/shared';
import store from './store';
import './resets.css';

const { AppContainer } = appEffects.components;

store.dispatch(shared.actions.initialized());

render(
  <Provider
    store={store}>
    <AppContainer/>
  </Provider>,
  document.querySelector('#root'),
);
