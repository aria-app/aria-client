import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import app from 'app';
import reducer from './reducer';
import './styles/resets.scss';

const { App } = app.components;

const store = createStore(reducer);

// TODO Subscribe to store and use to manage Transport

render(
  createElement(Provider, {
    store,
  }, createElement(App)),
  document.querySelector('#zen-app-root')
);
