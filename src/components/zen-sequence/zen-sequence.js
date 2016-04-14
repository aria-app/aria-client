import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import Tone from 'tone';
import './zen-sequence.scss';
import { ZenGrid } from 'components/zen-grid/zen-grid';
import { ZenSequenceToolbar } from 'components/zen-sequence-toolbar/zen-sequence-toolbar';
import { ZenKeys } from 'components/zen-keys/zen-keys';
import { getFrequency, getScale } from 'helpers/zen-scale/zen-scale';

export const ZenSequence = React.createClass({
  propTypes: {
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    selectedNotes: React.PropTypes.array,
    synth: React.PropTypes.object,
    requestAddNote: React.PropTypes.func,
    requestDeleteNotes: React.PropTypes.func,
    requestSetSynth: React.PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  },
  componentWillMount() {
    this.sequenceLoop = new Tone.Sequence((time, step) => {
      this.props.requestSetPosition(step);
      _.filter(this.props.notes, note => note.time === step)
        .forEach(note => {
          this.props.synth.triggerAttackRelease(
            getFrequency(note),
            note.length,
            time
          );
        });
    }, _.range(this.props.measureCount * 32), '32n');

    this.sequenceLoop.start();
  },
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
    this.contentElement.scrollTop = 2 * (40 * 12);
  },
  render() {
    return (
      h('.zen-sequence', [
        h(ZenSequenceToolbar, {
          requestSetSynth: this.props.requestSetSynth,
          synth: this.props.synth,
        }),
        h('.zen-sequence__content', {
          ref: this.setContentElement,
        }, [
          h('.zen-sequence__wrapper', [
            h(ZenKeys, {
              scale: getScale(),
              synth: this.props.synth,
            }),
            h(ZenGrid, {
              measureCount: this.props.measureCount,
              notes: this.props.notes,
              selectedNotes: this.props.selectedNotes,
              position: this.props.position,
              scale: getScale(),
              synth: this.props.synth,
              onNotePress: this.handleNotePress,
              onNotePress: this.handleNotePress,
              onSlotPress: this.props.requestAddNote,
            }),
          ]),
        ]),
      ])
    );
  },
  handleKeyUp(e) {
    if (e.code === 'Backspace') {
      this.props.requestDeleteNotes(this.props.selectedNotes);
      e.preventDefault();
      return false;
    }
    return true;
  },
  handleNotePress(note, isCtrlPressed) {
    if (!isCtrlPressed) this.props.requestSelectNotes([note]);

    if (_.includes(this.props.selectedNotes, note)) {
      this.props.requestSelectNotes(_.without(this.props.selectedNotes, note));
    } else {
      this.props.requestSelectNotes(this.props.selectedNotes.concat([note]));
    }
  },
  setContentElement(ref) {
    this.contentElement = ref;
  },
});
