import React from 'react';
import h from 'react-hyperscript';
import './zen-app.scss';
import { ZenSequence } from '../zen-sequence/zen-sequence';

export const ZenApp = React.createClass({
  getInitialState() {
    const audioContext = new window.AudioContext();
    return {
      audioContext,
    };
  },
  componentDidMount() {
  },
  render() {
    return (
      h('div.zen-app', [
        h(ZenSequence, { audioContext: this.state.audioContext }),
      ])
    );
  },
});
