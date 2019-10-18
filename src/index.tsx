import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import StylesProvider from '@material-ui/styles/StylesProvider';
import React from 'react';
import { render } from 'react-dom';
import { configure as configureHotkeys } from 'react-hotkeys';
import { Provider } from 'react-redux';
import Tone from 'tone';
import audio from './features/audio';
import dawww from './features/audio/dawww';
import app from './features/app';
import shared from './features/shared';
import store from './store';

configureHotkeys({ ignoreRepeatedEventsWhenKeyHeldDown: false });

['keydown', 'mousedown', 'touchdown'].forEach(eventName => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(shared.actions.userSignInSucceeded(user));
  } else {
    store.dispatch(shared.actions.userSignOutSucceeded());
  }
});

dawww.onPositionChange(position => {
  const prevPosition = audio.selectors.getPosition(store.getState());

  if (position === prevPosition) return;

  store.dispatch(shared.actions.positionRequestSucceeded(position));
});

dawww.onStateChange(playbackState => {
  store.dispatch(shared.actions.playbackStateRequestSucceeded(playbackState));
});

const { AppContainer } = app.components;

render(
  <StylesProvider injectFirst={true}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </StylesProvider>,
  document.querySelector('#root'),
);
