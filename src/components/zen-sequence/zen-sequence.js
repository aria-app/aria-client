import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import Tone from 'tone';
import './zen-sequence.scss';
import { ZenGrid } from 'components/zen-grid/zen-grid';
import { ZenKeys } from 'components/zen-keys/zen-keys';
import { pitches } from 'helpers/zen-pitches/zen-pitches';

export const ZenSequence = React.createClass({
  propTypes: {
    measureCount: React.PropTypes.number,
    synth: React.PropTypes.object,
  },
  getInitialState() {
    return {
      notes: [],
    };
  },
  componentWillMount() {
    this.loop = new Tone.Sequence((time, step) => {
      _.filter(this.state.notes, note => note.time === step)
        .forEach(note => {
          this.props.synth.triggerAttackRelease(
            note.frequency,
            note.length,
            time
          );
        });
    }, _.range(this.props.measureCount * 32), '32n');

    this.loop.start();
  },
  render() {
    return (
      h('.zen-sequence', {
        ref: this.getRef,
      }, [
        h('.zen-sequence__wrapper', [
          h(ZenKeys, {
            scale: getScale(),
            synth: this.props.synth,
          }),
          h(ZenGrid, {
            measureCount: this.props.measureCount,
            notes: this.state.notes,
            scale: getScale(),
            synth: this.props.synth,
            onNotePress: this.handleNotePress,
            onSlotPress: this.handleSlotPress,
          }),
        ]),
      ])
    );
  },
  handleNotePress(note) {
    this.setState({
      notes: _.without(this.state.notes, note),
    });
  },
  handleSlotPress(note) {
    this.setState({
      notes: this.state.notes.concat([note]),
    });
  },
  getRef(ref) {
    this.element = ref;
  },
});

function getScale() {
  return _([0, 1, 2, 3, 4, 5])
    .reverse()
    .flatMap(getOctave)
    .value();
}

function getOctave(octave) {
  return [
    { pitch: pitches.B, frequency: 30.87 * Math.pow(2, octave), octave },
    { pitch: pitches.BFLAT, frequency: 29.14 * Math.pow(2, octave), octave },
    { pitch: pitches.A, frequency: 27.50 * Math.pow(2, octave), octave },
    { pitch: pitches.GSHARP, frequency: 25.96 * Math.pow(2, octave), octave },
    { pitch: pitches.G, frequency: 24.50 * Math.pow(2, octave), octave },
    { pitch: pitches.FSHARP, frequency: 23.12 * Math.pow(2, octave), octave },
    { pitch: pitches.F, frequency: 21.83 * Math.pow(2, octave), octave },
    { pitch: pitches.E, frequency: 20.60 * Math.pow(2, octave), octave },
    { pitch: pitches.EFLAT, frequency: 19.45 * Math.pow(2, octave), octave },
    { pitch: pitches.D, frequency: 18.35 * Math.pow(2, octave), octave },
    { pitch: pitches.CSHARP, frequency: 17.32 * Math.pow(2, octave), octave },
    { pitch: pitches.C, frequency: 16.35 * Math.pow(2, octave), octave },
  ];
}
