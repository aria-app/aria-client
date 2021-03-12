import React from 'react';
import { render } from 'react-dom';
import { configure as configureHotkeys } from 'react-hotkeys';
import { RecoilRoot } from 'recoil';
import Tone from 'tone';

import ApolloWrapper from './ApolloWrapper';
import app from './features/app';
import audio from './features/audio';
import auth from './features/auth';
import shared from './features/shared';

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

render(
  <RecoilRoot>
    <ApolloWrapper>
      <AuthProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </AuthProvider>
    </ApolloWrapper>
  </RecoilRoot>,
  document.querySelector('#root'),
);
