import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import Tone from 'tone';
import './zen-sequence.scss';
import { pitches } from 'helpers/zen-pitches/zen-pitches';
import { ZenGrid } from 'components/zen-grid/zen-grid';
import { ZenKeys } from 'components/zen-keys/zen-keys';

export const ZenSequence = React.createClass({
  propTypes: {
    audioContext: PropTypes.object,
  },
  getInitialState() {
    return {
      notes: [],
    };
  },
  componentDidMount() {
    this.synth = new Tone.SimpleSynth({ oscillator: { type: 'pwm' } }).toMaster();
    // this.element.scrollTop = 1000;
  },
  render() {
    return (
      h('div.zen-sequence', { ref: this.getRef }, [
        h('div.zen-sequence__toolbar', [
          h('button.zen-sequence__play-button', {
            onClick: this.handlePlayClick,
          }, 'PLAY'),
        ]),
        h('div.zen-sequence__wrapper', [
          h(ZenKeys, {
            audioContext: this.props.audioContext,
            scale: getScale(),
          }),
          h(ZenGrid, {
            notes: this.state.notes,
            scale: getScale(),
            onSlotPress: this.handleSlotPress,
          }),
        ]),
      ])
    );
  },
  handlePlayClick() {
    console.log(this.state.notes);
  },
  handleSlotPress(sound) {
    if (_.includes(this.state.notes, sound)) {
      this.setState({
        notes: _.without(this.state.notes, sound),
      });
    } else {
      this.setState({
        notes: this.state.notes.concat([sound]),
      });
    }
  },
  getRef(ref) {
    this.element = ref;
  },
});

function getScale() {
  return [
    ...getOctave(5),
    ...getOctave(4),
    ...getOctave(3),
    ...getOctave(2),
    ...getOctave(1),
    ...getOctave(0),
  ];
}

function getOctave(octave) {
  return [
    { type: 'ivory', pitch: pitches.B, frequency: 30.87 * Math.pow(2, octave), octave },
    { type: 'ebony', pitch: pitches.BFLAT, frequency: 29.14 * Math.pow(2, octave), octave },
    { type: 'ivory', pitch: pitches.A, frequency: 27.50 * Math.pow(2, octave), octave },
    { type: 'ebony', pitch: pitches.GSHARP, frequency: 25.96 * Math.pow(2, octave), octave },
    { type: 'ivory', pitch: pitches.G, frequency: 24.50 * Math.pow(2, octave), octave },
    { type: 'ebony', pitch: pitches.FSHARP, frequency: 23.12 * Math.pow(2, octave), octave },
    { type: 'ivory', pitch: pitches.F, frequency: 21.83 * Math.pow(2, octave), octave },
    { type: 'ivory', pitch: pitches.E, frequency: 20.60 * Math.pow(2, octave), octave },
    { type: 'ebony', pitch: pitches.EFLAT, frequency: 19.45 * Math.pow(2, octave), octave },
    { type: 'ivory', pitch: pitches.D, frequency: 18.35 * Math.pow(2, octave), octave },
    { type: 'ebony', pitch: pitches.CSHARP, frequency: 17.32 * Math.pow(2, octave), octave },
    { type: 'ivory', pitch: pitches.C, frequency: 16.35 * Math.pow(2, octave), octave },
  ];
}
