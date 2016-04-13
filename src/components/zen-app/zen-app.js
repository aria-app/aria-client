import React from 'react';
import h from 'react-hyperscript';
import Tone from 'tone';
import './zen-app.scss';
import { ZenSequence } from 'components/zen-sequence/zen-sequence';

export const ZenApp = React.createClass({
  componentWillMount() {
    this.synth = new Tone.PolySynth(4, Tone.SimpleSynth, {
      oscillator: { type: 'square' },
    }).toMaster();
    this.synth.volume.value = -20;
    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
  },
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  render() {
    return (
      h('.zen-app', [
        h(ZenSequence, {
          measureCount: 1,
          synth: this.synth,
        }),
      ])
    );
  },
  handleKeyDown(e) {
    if (e.code === 'Space') {
      this.playPause();
      e.preventDefault();
      return false;
    } else if (e.code === 'Escape') {
      this.stop();
      e.preventDefault();
      return false;
    }
    return true;
  },
  playPause() {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
  },
  stop() {
    Tone.Transport.stop();
  },
});
