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
    const keys = [
      ...getOctave(5),
      ...getOctave(4),
      ...getOctave(3),
      ...getOctave(2),
      ...getOctave(1),
      ...getOctave(0),
    ];
    const notes = [
      { left: 2, top: 8 },
      { left: 5, top: 4 },
    ];
    return (
      h('div.zen-sequence', [
        h('div.zen-sequence__wrapper', [
          h(ZenSequenceKeys, {
            audioContext: this.props.audioContext,
            keys,
          }),
          h(ZenSequenceGrid, { keys, notes }),
        ]),
      ])
    );
  },
});

function getOctave(number) {
  return [
    { type: 'ivory', name: 'B', frequency: 30.87 * Math.pow(2, number), number },
    { type: 'ebony', name: 'Bb', frequency: 29.14 * Math.pow(2, number), number },
    { type: 'ivory', name: 'A', frequency: 27.50 * Math.pow(2, number), number },
    { type: 'ebony', name: 'G#', frequency: 25.96 * Math.pow(2, number), number },
    { type: 'ivory', name: 'G', frequency: 24.50 * Math.pow(2, number), number },
    { type: 'ebony', name: 'F#', frequency: 23.12 * Math.pow(2, number), number },
    { type: 'ivory', name: 'F', frequency: 21.83 * Math.pow(2, number), number },
    { type: 'ivory', name: 'E', frequency: 20.60 * Math.pow(2, number), number },
    { type: 'ebony', name: 'Eb', frequency: 19.45 * Math.pow(2, number), number },
    { type: 'ivory', name: 'D', frequency: 18.35 * Math.pow(2, number), number },
    { type: 'ebony', name: 'C#', frequency: 17.32 * Math.pow(2, number), number },
    { type: 'ivory', name: 'C', frequency: 16.35 * Math.pow(2, number), number },
  ];
}
