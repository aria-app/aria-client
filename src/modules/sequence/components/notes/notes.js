import { PropTypes } from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { selectNotes } from '../../actions';
import selectors from '../../selectors';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  notes,
  onPress,
  selectedNotes,
}) => h('.notes', notes.map((note, index) =>
  h(Note, {
    key: index,
    isSelected: _.includes(selectedNotes, note),
    note,
    onPress,
  })
));

const composed = compose([
  setPropTypes({
    notes: PropTypes.array,
    requestSelectNotes: PropTypes.func,
    selectedNotes: PropTypes.array,
  }),
  withHandlers({
    onPress: ({
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


function mapStateToProps(state) {
  return {
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSelectNotes: notes => {
      dispatch(selectNotes(notes));
    },
  };
}

export const Notes = connect(
  mapStateToProps,
  mapDispatchToProps
)(composed);
