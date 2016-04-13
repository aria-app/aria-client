import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import Tone from 'tone';
import './zen-sequence.scss';
import { ZenGrid } from 'components/zen-grid/zen-grid';
import { ZenSequenceToolbar } from 'components/zen-sequence-toolbar/zen-sequence-toolbar';
import { ZenKeys } from 'components/zen-keys/zen-keys';
import { getScale } from 'helpers/zen-scale/zen-scale';
import { synths } from 'helpers/zen-synths/zen-synths';

export const ZenSequence = React.createClass({
  propTypes: {
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    synth: React.PropTypes.object,
    requestAddNote: React.PropTypes.func,
    requestRemoveNote: React.PropTypes.func,
    requestSetSynth: React.PropTypes.func,
  },
  componentWillMount() {
    this.loop = new Tone.Sequence((time, step) => {
      _.filter(this.props.notes, note => note.time === step)
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
      h('.zen-sequence', [
        h(ZenSequenceToolbar, { requestSetSynth: this.props.requestSetSynth }),
        h('.zen-sequence__content', [
          h('.zen-sequence__wrapper', [
            h(ZenKeys, {
              scale: getScale(),
              synth: this.props.synth,
            }),
            h(ZenGrid, {
              measureCount: this.props.measureCount,
              notes: this.props.notes,
              scale: getScale(),
              synth: this.props.synth,
              onNotePress: this.props.requestRemoveNote,
              onSlotPress: this.props.requestAddNote,
            }),
          ]),
        ]),
      ])
    );
  },
});
