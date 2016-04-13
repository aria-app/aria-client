import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { app } from './redux/reducers';
import { Provider } from 'react-redux';
import './styles/resets.scss';
import { ZenApp } from './components/zen-app/zen-app';

render(
  createElement(Provider, {
    store: createStore(app),
  }, createElement(ZenApp)),
  document.querySelector('#zen-app-root')
);
