import React from 'react';
import { render } from 'react-dom';
import { configure as configureHotkeys } from 'react-hotkeys';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import Tone from 'tone';

import app from './features/app';
import audio from './features/audio';
import auth from './features/auth';
import shared from './features/shared';
import store from './store';

const { App } = app.components;
const { AudioProvider } = audio.components;
const { AuthProvider } = auth.components;

shared.firebase.initialize();

configureHotkeys({ ignoreRepeatedEventsWhenKeyHeldDown: false });

['keydown', 'mousedown', 'touchdown'].forEach((eventName) => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});

store.dispatch(shared.actions.initialized());

render(
  <RecoilRoot>
    <AuthProvider>
      <AudioProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AudioProvider>
    </AuthProvider>
  </RecoilRoot>,
  document.querySelector('#root'),
);
