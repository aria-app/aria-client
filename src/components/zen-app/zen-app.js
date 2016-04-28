import h from 'react-hyperscript';
import Tone from 'tone';
import Mousetrap from 'mousetrap';
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
  Mousetrap.bind(['enter', 'space'], playPause);
  Mousetrap.bind('escape', stop);
}

function playPause() {
  if (Tone.Transport.state === 'started') {
    Tone.Transport.pause();
  } else {
    Tone.Transport.start();
  }
}

function stop() {
  Tone.Transport.stop();
}
