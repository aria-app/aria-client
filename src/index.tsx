import { render } from 'react-dom';
import { configure as configureHotkeys } from 'react-hotkeys';
import { RecoilRoot } from 'recoil';
import * as Tone from 'tone';

import { ApolloWrapper } from './ApolloWrapper';
import app from './features/app';
import audio from './features/audio';
import auth from './features/auth';
import { I18NWrapper } from './i18n';

const { App } = app.components;
const { AudioProvider } = audio.components;
const { AuthProvider } = auth.components;

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
          <I18NWrapper>
            <App />
          </I18NWrapper>
        </AudioProvider>
      </AuthProvider>
    </ApolloWrapper>
  </RecoilRoot>,
  document.querySelector('#root'),
);
