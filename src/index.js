import 'firebase/auth';
import 'firebase/firestore';
import StylesProvider from '@material-ui/styles/StylesProvider';
import React from 'react';
import { render } from 'react-dom';
import { configure as configureHotkeys } from 'react-hotkeys';
import { Provider } from 'react-redux';
import Tone from 'tone';
import app from './features/app';
import shared from './features/shared';
import store from './store';

configureHotkeys({ ignoreRepeatedEventsWhenKeyHeldDown: false });

['keydown', 'mousedown', 'touchdown'].forEach((eventName) => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});

store.dispatch(shared.actions.initialized());

const { AppContainer } = app.components;

render(
  <StylesProvider injectFirst={true}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </StylesProvider>,
  document.querySelector('#root'),
);
