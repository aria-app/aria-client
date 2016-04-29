import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

function mapStateToProps(state) {
  return {
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectNotes: notes => {
      dispatch(actions.selectNotes(notes));
    },
  };
}
