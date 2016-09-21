import 'babel-polyfill';
import h from 'react-hyperscript';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import app from './features/app';
import store from './store';
import './styles/resets.scss';

const { AppContainer } = app.components;

render(
  h(Provider, {
    store,
  }, h(AppContainer)),
  document.querySelector('#zen-app-root')
);
