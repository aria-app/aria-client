import { createElement } from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import app from 'modules/app';
import shortcuts from 'modules/shortcuts';
import sound from 'modules/sound';
import reducer from './reducer';
import './styles/resets.scss';

const { App } = app.components;

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

store.dispatch(shortcuts.actions.initialize());
store.dispatch(sound.actions.initialize());

render(
  createElement(Provider, {
    store,
  }, createElement(App)),
  document.querySelector('#zen-app-root')
);
