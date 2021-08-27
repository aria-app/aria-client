import '@emotion/react';
import { useEffect } from 'react';

import { configure as configureHotkeys } from 'react-hotkeys';
import { RecoilRoot } from 'recoil';
import * as Tone from 'tone';

import { ClientProvider } from '../src/features/api';
import { App } from '../src/features/app';
import { AudioProvider } from '../src/features/audio';
import { AuthProvider } from '../src/features/auth';
import { I18NWrapper } from '../src/i18n';

export function Index() {
  useEffect(() => {
    configureHotkeys({ ignoreRepeatedEventsWhenKeyHeldDown: false });

    ['keydown', 'mousedown', 'touchdown'].forEach((eventName) => {
      document.body.addEventListener(eventName, () => {
        Tone.start();
      });
    });
  }, []);
  return (
    <ClientProvider>
      <RecoilRoot>
        <AuthProvider>
          <AudioProvider>
            <I18NWrapper>
              <App />
            </I18NWrapper>
          </AudioProvider>
        </AuthProvider>
      </RecoilRoot>
    </ClientProvider>
  );
}

export default Index;
