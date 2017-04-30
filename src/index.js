import 'babel-polyfill';
import h from 'react-hyperscript';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import appEffects from './features/app-effects';
import shared from './features/shared';
import store from './store';
import './styles/resets.scss';

const { AppContainer } = appEffects.components;

store.dispatch(shared.actions.initialized());

// Disable back button
history.pushState(null, null, location.href);
window.onpopstate = () => {
  window.history.go(1);
};

render(
  h(Provider, {
    store,
  }, h(AppContainer)),
  document.querySelector('#zen-app-root'),
);
