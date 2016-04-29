import React from 'react';
import h from 'react-hyperscript';
import Tone from 'tone';
import Mousetrap from 'mousetrap';
import sequence from 'modules/sequence';
import './app.scss';

const { SequenceContainer } = sequence.components;

const component = () =>
  h('.app', [
    h(SequenceContainer),
  ]);

const classified = React.createClass({
  componentWillMount() {
    Tone.Transport.bpm.value = 120;
    Mousetrap.bind(['enter', 'space'], playPause);
    Mousetrap.bind('escape', stop);
    // Mousetrap.bind(['backspace', 'del'], this.deleteNotes);
  },
  render() {
    return h(component, {
      ...this.props,
    }, this.props.children);
  },
});

export const App = classified;

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
