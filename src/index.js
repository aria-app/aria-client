import 'firebase/auth';
import 'firebase/firestore';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Tone from 'tone';
import app from './features/app';
import shared from './features/shared';
import store from './store';
import './resets.css';

['keydown', 'mousedown', 'touchdown'].forEach(eventName => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});

const styleNode = document.createComment('insertion-point-jss');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'insertion-point-jss',
});

const { AppContainer } = app.components;

store.dispatch(shared.actions.initialized());

render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </JssProvider>,
  document.querySelector('#root'),
);
