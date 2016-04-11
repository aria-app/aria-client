import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-sequence.scss';
import { pitches } from 'helpers/zen-pitches/zen-pitches';
import { ZenSequenceGrid } from 'components/zen-sequence-grid/zen-sequence-grid';
import { ZenSequenceKeys } from 'components/zen-sequence-keys/zen-sequence-keys';

export const ZenSequence = React.createClass({
  propTypes: {
    audioContext: PropTypes.object,
  },
  componentDidMount() {
    this.element.scrollTop = 1000;
  },
  render() {
    const activeNotes = [
      {
        octave: 3,
        pitch: pitches.C,
        time: 0,
      },
      {
        octave: 3,
        pitch: pitches.D,
        time: 2,
      },
      {
        octave: 3,
        pitch: pitches.E,
        time: 4,
      },
    ];
    return (
      h('div.zen-sequence', { ref: this.getRef }, [
        h('div.zen-sequence__wrapper', [
          h(ZenSequenceKeys, {
            audioContext: this.props.audioContext,
            notes: getNotes(),
          }),
          h(ZenSequenceGrid, {
            notes: getNotes(),
            activeNotes,
          }),
        ]),
      ])
    );
  },
  getRef(ref) {
    this.element = ref;
  },
});

function getNotes() {
  return [
    ...getOctave(5),
    ...getOctave(4),
    ...getOctave(3),
    ...getOctave(2),
    ...getOctave(1),
    ...getOctave(0),
  ];
}

function getOctave(number) {
  return [
    { type: 'ivory', pitch: pitches.B, frequency: 30.87 * Math.pow(2, number), number },
    { type: 'ebony', pitch: pitches.BFLAT, frequency: 29.14 * Math.pow(2, number), number },
    { type: 'ivory', pitch: pitches.A, frequency: 27.50 * Math.pow(2, number), number },
    { type: 'ebony', pitch: pitches.GSHARP, frequency: 25.96 * Math.pow(2, number), number },
    { type: 'ivory', pitch: pitches.G, frequency: 24.50 * Math.pow(2, number), number },
    { type: 'ebony', pitch: pitches.FSHARP, frequency: 23.12 * Math.pow(2, number), number },
    { type: 'ivory', pitch: pitches.F, frequency: 21.83 * Math.pow(2, number), number },
    { type: 'ivory', pitch: pitches.E, frequency: 20.60 * Math.pow(2, number), number },
    { type: 'ebony', pitch: pitches.EFLAT, frequency: 19.45 * Math.pow(2, number), number },
    { type: 'ivory', pitch: pitches.D, frequency: 18.35 * Math.pow(2, number), number },
    { type: 'ebony', pitch: pitches.CSHARP, frequency: 17.32 * Math.pow(2, number), number },
    { type: 'ivory', pitch: pitches.C, frequency: 16.35 * Math.pow(2, number), number },
  ];
}
