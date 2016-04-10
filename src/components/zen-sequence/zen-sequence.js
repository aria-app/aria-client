import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-sequence.scss';
import { ZenSequenceGrid } from '../zen-sequence-grid/zen-sequence-grid';
import { ZenSequenceKeys } from '../zen-sequence-keys/zen-sequence-keys';

export const ZenSequence = React.createClass({
  propTypes: {
    audioContext: PropTypes.object,
  },
  componentDidMount() {
    // this.props.oscillator.type = 'square';
    // this.props.oscillator.frequency.value = 300;
    // this.props.oscillator.start();
  },
  render() {
    const notes = [
      { left: 2, top: 8 },
      { left: 5, top: 4 },
    ];
    return (
      h('div.zen-sequence', [
        h('div.zen-sequence__wrapper', [
          h(ZenSequenceKeys, {
            audioContext: this.props.audioContext,
          }),
          h(ZenSequenceGrid, { notes }),
        ]),
      ])
    );
  },
});
