import React from 'react';
import h from 'react-hyperscript';
import Tone from 'tone';
import './zen-app.scss';
import { ZenSequence } from '../zen-sequence/zen-sequence';

export const ZenApp = React.createClass({
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  render() {
    return (
      h('div.zen-app', [
        h(ZenSequence),
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
