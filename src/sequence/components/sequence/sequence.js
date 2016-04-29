import React from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import _ from 'lodash';
import Mousetrap from 'mousetrap';
import Tone from 'tone';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import sound from 'sound';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { deleteNotes, setPosition, setSynth, setTool } from '../../actions';
import { toolTypes } from '../../constants';
import { SequenceToolbar } from '../sequence-toolbar/sequence-toolbar';
import './sequence.scss';

const { getFrequency } = sound.model;

const component = ({
  requestDrawNote,
  requestSetSynth,
  requestSetTool,
  synth,
  tool,
}) => h('.sequence', [
  h(SequenceToolbar, {
    requestSetSynth,
    requestSetTool,
    currentSynth: synth,
    currentTool: tool,
  }),
  h('.sequence__content', {
    // scrollTop: 2 * (40 * 12),
  }, [
    h('.sequence__wrapper', [
      h(Keys, {
        synth,
      }),
      h(Grid, {
        onSlotPress: requestDrawNote,
      }),
    ]),
  ]),
]);

const composed = compose([
  setDisplayName('Sequence'),
  setPropTypes({
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    selectedNotes: React.PropTypes.array,
    synth: React.PropTypes.object,
    tool: React.PropTypes.string,
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

const seq = React.createClass({
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

function mapStateToProps(state) {
  return {
    measureCount: state.sequence.measureCount,
    notes: state.sequence.notes,
    selectedNotes: state.sequence.selectedNotes,
    synth: state.sequence.synth,
    tool: state.sequence.tool,
  };
}

export const Sequence = connect(
  mapStateToProps,
  (dispatch) => ({
    requestDeleteNotes: note => {
      dispatch(deleteNotes(note));
    },
    requestSetPosition: position => {
      dispatch(setPosition(position));
    },
    requestSetSynth: type => {
      dispatch(setSynth(type));
    },
    requestSetTool: tool => {
      dispatch(setTool(tool));
    },
  })
)(seq);
