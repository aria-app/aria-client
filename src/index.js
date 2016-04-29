import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import app from 'app';
import sound from 'sound';
import reducer from './reducer';
import './styles/resets.scss';

const { App } = app.components;
const { initializeState, updateState } = sound.model;

const store = createStore(reducer);

initializeState(store.getState(), store.dispatch);

store.subscribe(() => updateState(store.getState()));

render(
  createElement(Provider, {
    store,
  }, createElement(App)),
  document.querySelector('#zen-app-root')
);
