import React from 'react';
import h from 'react-hyperscript';
import Tone from 'tone';
import './zen-app.scss';
import { ZenSequenceContainer } from 'containers/zen-sequence-container/zen-sequence-container';

export const ZenApp = React.createClass({
  componentWillMount() {
    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
  },
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  render() {
    return (
      h('.zen-app', [
        h(ZenSequenceContainer),
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
