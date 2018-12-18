import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StartAudioContext from 'startaudiocontext';
import Tone from 'tone';
import './initializeFirebaseApp';
import app from './features/app';
import shared from './features/shared';
import store from './store';
import './resets.css';

const { AppContainer } = app.components;

// TODO: Move this out to Dawww?
StartAudioContext(Tone.context);

store.dispatch(shared.actions.initialized());

render((
  <BrowserRouter>
    <Provider
      store={store}>
        <AppContainer/>
    </Provider>
  </BrowserRouter>
),
  document.querySelector('#root'),
);
