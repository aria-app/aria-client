import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { app } from './redux/reducers';
import { Provider } from 'react-redux';
import { ZenApp } from './components/zen-app/zen-app';
import './styles/resets.scss';

const store = createStore(app);

// TODO Subscribe to store and use to manage Transport

render(
  createElement(Provider, {
    store,
  }, createElement(ZenApp)),
  document.querySelector('#zen-app-root')
);
