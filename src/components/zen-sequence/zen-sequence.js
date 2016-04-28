import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import Tone from 'tone';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { ZenGrid } from '../zen-grid/zen-grid';
import { ZenSequenceToolbar } from '../zen-sequence-toolbar/zen-sequence-toolbar';
import { ZenKeys } from '../zen-keys/zen-keys';
import { getFrequency } from '../../helpers/zen-scale/zen-scale';
import { tools } from '../../helpers/zen-tools/zen-tools';
import './zen-sequence.scss';

const component = ({
  measureCount,
  notes,
  onNotePress,
  position,
  requestDrawNote,
  requestSetSynth,
  requestSetTool,
  selectedNotes,
  synth,
  tool,
}) => h('.zen-sequence', [
  h(ZenSequenceToolbar, {
    requestSetSynth,
    requestSetTool,
    currentSynth: synth,
    currentTool: tool,
  }),
  h('.zen-sequence__content', {
    // scrollTop: 2 * (40 * 12),
  }, [
    h('.zen-sequence__wrapper', [
      h(ZenKeys, {
        synth,
      }),
      h(ZenGrid, {
        measureCount,
        notes,
        selectedNotes,
        position,
        synth,
        tool,
        onNotePress,
        onSlotPress: requestDrawNote,
      }),
    ]),
  ]),
]);

const composed = compose([
  setPropTypes({
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    selectedNotes: React.PropTypes.array,
    synth: React.PropTypes.object,
    tool: React.PropTypes.oneOf(tools),
    requestDrawNote: React.PropTypes.func,
    requestDeleteNotes: React.PropTypes.func,
    requestSetSynth: React.PropTypes.func,
    requestSetTool: React.PropTypes.func,
  }),
  pure,
])(component);

export const ZenSequence = React.createClass({
  componentWillMount() {
    const {
      measureCount,
      notes,
      requestDeleteNotes,
      requestSetPosition,
      selectedNotes,
    } = this.props;
    const sequence = new Tone.Sequence((time, step) => {
      console.log('sequence');
      requestSetPosition(step);
      _.filter(notes, note => note.time === step)
        .forEach(note => {
          this.props.synth.triggerAttackRelease(
            getFrequency(note),
            note.length,
            time
          );
        });
    }, _.range(measureCount * 32), '32n');

    console.log('sequencestart');
    sequence.start();

    document.addEventListener('keyup', handleKeyUp({
      requestDeleteNotes,
      selectedNotes,
    }));
  },
  render() {
    return h(composed, {
      ...this.props,
    });
  },
});

function handleKeyUp({ requestDeleteNotes, selectedNotes }) {
  return e => {
    if (e.code === 'Backspace') {
      requestDeleteNotes(selectedNotes);
      e.preventDefault();
      return false;
    }
    return true;
  };
}
