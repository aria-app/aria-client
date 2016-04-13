import React from 'react';
import h from 'react-hyperscript';
import './zen-keys.scss';
import { getLetter } from 'helpers/zen-pitches/zen-pitches';

export const ZenKeys = React.createClass({
  propTypes: {
    audioContext: React.PropTypes.object,
    scale: React.PropTypes.array,
    synth: React.PropTypes.object,
  },
  render() {
    const keys = this.props.scale.map(note => h(
      `.zen-keys__key.zen-keys__key--${getLetter(note.pitch)}`, {
        onMouseUp: () => this.handleMouseUp(note),
      }, h('.zen-keys__key__label', getLabel(note))
    ));

    return (
      h('.zen-keys', keys)
    );
  },
  handleMouseUp(note) {
    this.props.synth.triggerAttackRelease(note.frequency, '8n');
  },
});

function getLabel(note) {
  return getLetter(note.pitch).toUpperCase() + String(note.octave);
}
