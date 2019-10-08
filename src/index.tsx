import 'firebase/auth';
import 'firebase/firestore';
import StylesProvider from '@material-ui/styles/StylesProvider';
import React from 'react';
import { render } from 'react-dom';
import { configure } from 'react-hotkeys';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Tone from 'tone';
import app from './features/app';
import shared from './features/shared';
import store from './store';

configure({ ignoreRepeatedEventsWhenKeyHeldDown: false });

['keydown', 'mousedown', 'touchdown'].forEach(eventName => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});

const { AppContainer } = app.components;

store.dispatch(shared.actions.initialized());

render(
  <StylesProvider injectFirst={true}>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </StylesProvider>,
  document.querySelector('#root'),
);
