import React from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import _ from 'lodash';
import Mousetrap from 'mousetrap';
import Tone from 'tone';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import sound from 'sound';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { deleteNotes, setPosition, setSynth, setTool } from '../../actions';
import selectors from '../../selectors';
import { SequenceToolbar } from '../sequence-toolbar/sequence-toolbar';
import './sequence.scss';

const { playNote } = sound.model;

const component = ({
  requestSetSynth,
  requestSetTool,
  scale,
  synth,
  tool,
}) => h('.sequence', [
  h(SequenceToolbar, {
    requestSetSynth,
    requestSetTool,
    synth,
    tool,
  }),
  h('.sequence__content', {
    // scrollTop: 2 * (40 * 12),
  }, [
    h('.sequence__wrapper', [
      h(Keys, {
        scale,
        synth,
      }),
      h(Grid),
    ]),
  ]),
]);

const composed = compose([
  setPropTypes({
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    selectedNotes: React.PropTypes.array,
    scale: React.PropTypes.array,
    synth: React.PropTypes.string,
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

const classified = React.createClass({
  componentWillMount() {
    new Tone.Sequence((time, step) => {
      this.props.requestSetPosition(step);
      _.filter(this.props.notes, note => note.time === step)
        .forEach(note => {
          playNote(note.frequency, note.length, time);
        });
    }, _.range(this.props.measureCount * 32), '32n').start();

    Mousetrap.bind(['backspace', 'del'], this.deleteNotes);
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
    measureCount: selectors.getMeasureCount(state),
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
    scale: selectors.getScale(state),
    synth: selectors.getSynth(state),
    tool: selectors.getTool(state),
  };
}

export const Sequence = connect(
  mapStateToProps,
  (dispatch) => ({
    requestDeleteNotes: notes => {
      dispatch(deleteNotes(notes));
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
)(classified);
