import h from 'react-hyperscript';
import Tone from 'tone';
import Mousetrap from 'mousetrap';
import { compose, lifecycle } from 'recompose';
import sequence from 'sequence';
import './app.scss';

const { Sequence } = sequence.components;

const component = () =>
  h('.app', [
    h(Sequence),
  ]);

export const App = compose([
  lifecycle(startup),
])(component);

function startup() {
  Tone.Transport.bpm.value = 90;
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
