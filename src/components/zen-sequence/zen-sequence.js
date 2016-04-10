import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-sequence.scss';
import { ZenSequenceGrid } from '../zen-sequence-grid/zen-sequence-grid';
import { ZenSequenceKeys } from '../zen-sequence-keys/zen-sequence-keys';

const noteValues = {
  'b': 11,
  'bflat': 10,
  'a': 9,
  'gsharp': 8,
  'g': 7,
  'fsharp': 6,
  'f': 5,
  'e': 4,
  'eflat': 3,
  'd': 2,
  'csharp': 1,
  'c': 0,
};

export const ZenSequence = React.createClass({
  propTypes: {
    audioContext: PropTypes.object,
  },
  componentDidMount() {
    this.element.scrollTop = 1000;
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
    // const notes = [
    //   { left: 2, top: 8 },
    //   { left: 5, top: 4 },
    // ];
    const notes = [
      {
        octave: 3,
        note: noteValues.e,
        time: 3,
      },
    ];
    return (
      h('div.zen-sequence', { ref: this.getRef }, [
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
  getRef(ref) {
    this.element = ref;
  },
});

function getOctave(number) {
  return [
    { type: 'ivory', note: noteValues.b, frequency: 30.87 * Math.pow(2, number), number },
    { type: 'ebony', note: noteValues.bflat, frequency: 29.14 * Math.pow(2, number), number },
    { type: 'ivory', note: noteValues.a, frequency: 27.50 * Math.pow(2, number), number },
    { type: 'ebony', note: noteValues.gsharp, frequency: 25.96 * Math.pow(2, number), number },
    { type: 'ivory', note: noteValues.g, frequency: 24.50 * Math.pow(2, number), number },
    { type: 'ebony', note: noteValues.fsharp, frequency: 23.12 * Math.pow(2, number), number },
    { type: 'ivory', note: noteValues.f, frequency: 21.83 * Math.pow(2, number), number },
    { type: 'ivory', note: noteValues.e, frequency: 20.60 * Math.pow(2, number), number },
    { type: 'ebony', note: noteValues.eflat, frequency: 19.45 * Math.pow(2, number), number },
    { type: 'ivory', note: noteValues.d, frequency: 18.35 * Math.pow(2, number), number },
    { type: 'ebony', note: noteValues.csharp, frequency: 17.32 * Math.pow(2, number), number },
    { type: 'ivory', note: noteValues.c, frequency: 16.35 * Math.pow(2, number), number },
  ];
}
