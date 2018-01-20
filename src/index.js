import 'babel-polyfill';
import 'rxjs/add/observable/fromEvent';
import h from 'react-hyperscript';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import appEffects from './features/app';
import shared from './features/shared';
import store from './store';
import './styles/resets.scss';

const { AppContainer } = appEffects.components;

store.dispatch(shared.actions.initialized());

render(
  h(Provider, {
    store,
  }, h(AppContainer)),
  document.querySelector('#root'),
);
