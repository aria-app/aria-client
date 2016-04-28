import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import Mousetrap from 'mousetrap';
import Tone from 'tone';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { ZenGrid } from '../zen-grid/zen-grid';
import { ZenSequenceToolbar } from '../zen-sequence-toolbar/zen-sequence-toolbar';
import { ZenKeys } from '../zen-keys/zen-keys';
import { getFrequency, scale } from '../../helpers/zen-scale/zen-scale';
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
  withHandlers({
    onNotePress: ({
      requestSelectNotes,
      selectedNotes,
    }) => (note, isCtrlPressed) => {
      if (!isCtrlPressed) requestSelectNotes([note]);

      if (_.includes(selectedNotes, note)) {
        requestSelectNotes(_.without(selectedNotes, note));
      } else {
        requestSelectNotes(selectedNotes.concat([note]));
      }
    },
  }),
  pure,
])(component);

export const ZenSequence = React.createClass({
  componentWillMount() {
    new Tone.Sequence((time, step) => {
      this.props.requestSetPosition(step);
      _.filter(this.props.notes, note => note.time === step)
        .forEach(note => {
          this.props.synth.triggerAttackRelease(
            getFrequency(note),
            note.length,
            time
          );
        });
    }, _.range(this.props.measureCount * 32), '32n').start();

    Mousetrap.bind('backspace', this.deleteNotes);
  },
  render() {
    return h(composed, {
      ...this.props,
    });
  },
  deleteNotes() {
    this.props.requestDeleteNotes(this.props.selectedNotes);
  },
});
