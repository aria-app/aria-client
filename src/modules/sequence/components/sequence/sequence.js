import React from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import _ from 'lodash';
import Mousetrap from 'mousetrap';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { deleteNotes, playNote, setSynth, setTool } from '../../actions';
import selectors from '../../selectors';
import { SequenceToolbar } from '../sequence-toolbar/sequence-toolbar';
import './sequence.scss';

const component = ({
  requestPlayNote,
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
        requestPlayNote,
        scale,
        synth,
      }),
      h(Grid),
    ]),
  ]),
]);

const composed = compose([
  setPropTypes({
    selectedNotes: React.PropTypes.array,
    scale: React.PropTypes.array,
    synth: React.PropTypes.string,
    tool: React.PropTypes.string,
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
    selectedNotes: selectors.getSelectedNotes(state),
    scale: selectors.getScale(state),
    synth: selectors.getSynth(state),
    tool: selectors.getTool(state),
  };
}

export const Sequence = connect(
  mapStateToProps,
  (dispatch) => ({
    requestPlayNote: (...options) => {
      dispatch(playNote(...options));
    },
    requestDeleteNotes: notes => {
      dispatch(deleteNotes(notes));
    },
    requestSetSynth: type => {
      dispatch(setSynth(type));
    },
    requestSetTool: tool => {
      dispatch(setTool(tool));
    },
  })
)(classified);
