import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import h from 'react-hyperscript';
import classnames from 'classnames';
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
          h('div',
            {
              className: this.getKeyClasses(note),
              onMouseUp: () => this.handleMouseUp(note),
            },
            note.pitch === 0 ? `C${note.octave}` : ''
          )
        )
      )
    );
  },
  handleMouseUp(note) {
    this.synth.triggerAttackRelease(note.frequency, '8n');
  },
  getKeyClasses(note) {
    return classnames({
      'zen-sequence-keys__key--ebony': note.type === 'ebony',
      'zen-sequence-keys__key--ivory': note.type === 'ivory',
      'zen-sequence-keys__key--ivory--c': note.pitch === pitches.C,
      'zen-sequence-keys__key--ivory--f': note.pitch === pitches.F,
    });
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
