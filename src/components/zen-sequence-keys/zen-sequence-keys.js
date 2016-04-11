import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import h from 'react-hyperscript';
import Tone from 'tone';
import './zen-sequence-keys.scss';
import { pitches } from 'helpers/zen-pitches/zen-pitches';

export const ZenSequenceKeys = React.createClass({
  propTypes: {
    audioContext: PropTypes.object,
    notes: PropTypes.array,
  },
  getInitialState() {
    return {
      oscillators: Immutable.Map(),
    };
  },
  componentDidMount() {
    this.synth = new Tone.SimpleSynth({ oscillator: { type: 'pulse' } }).toMaster();
  },
  render() {
    return (
      h('div.zen-sequence-keys',
        this.props.notes.map(note =>
          h(`div.zen-sequence-keys__key--${note.type}${note.pitch === pitches.C ? '.zen-sequence-keys__key--ivory--c' : ''}${note.pitch === pitches.F ? '.zen-sequence-keys__key--ivory--f' : ''}`,
            {
              onMouseDown: () => this.handleMouseDown(note),
              onMouseUp: () => this.handleMouseUp(note),
            },
            note.pitch === 0 ? `C${note.octave}` : ''
          )
        )
      )
    );
  },
  handleMouseDown(note) {
    // const oscillator = this.getOscillator(note.frequency);
    // oscillator.start();
    // this.setState({
    //   oscillators: this.state.oscillators.set(
    //     note.pitch,
    //     oscillator
    //   ),
    // });
  },
  handleMouseUp(note) {
    this.synth.triggerAttackRelease(note.frequency, '8n');
    // this.state.oscillators.get(note.pitch).stop();
  },
  getOscillator(frequency) {
    const oscillator = this.props.audioContext.createOscillator();
    const gain = this.props.audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);

    gain.gain.value = 0.5;
    gain.connect(this.props.audioContext.destination);

    return oscillator;
  },
});
