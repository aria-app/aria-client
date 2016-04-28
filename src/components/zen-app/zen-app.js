import h from 'react-hyperscript';
import Tone from 'tone';
import _ from 'lodash';
import { compose, lifecycle } from 'recompose';
import {
  ZenSequenceContainer,
} from '../../containers/zen-sequence-container/zen-sequence-container';
import './zen-app.scss';

const component = () =>
  h('.zen-app', [
    h(ZenSequenceContainer),
  ]);

export const ZenApp = compose([
  lifecycle(startup),
])(component);

function startup() {
  Tone.Transport.bpm.value = 120;
  document.addEventListener('keydown', e => handleDocumentKeydown(e));
}

function handleDocumentKeydown(e) {
  if (_.includes(['Enter', 'Space'], e.code)) {
    playPause();
    e.preventDefault();
    return false;
  } else if (e.code === 'Escape') {
    stop();
    e.preventDefault();
    return false;
  }
  return true;
}

function playPause() {
  if (Tone.Transport.state === 'started') {
    console.log('pause');
    Tone.Transport.pause();
  } else {
    console.log('start');
    Tone.Transport.start();
  }
}

function stop() {
  Tone.Transport.stop();
}
