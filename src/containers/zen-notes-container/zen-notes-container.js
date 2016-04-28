import { connect } from 'react-redux';
import { ZenNotes } from '../../components/zen-notes/zen-notes';
import { selectNotes } from '../../redux/actions';

function mapStateToProps(state) {
  return {
    notes: state.notes,
    selectedNotes: state.selectedNotes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSelectNotes: notes => {
      dispatch(selectNotes(notes));
    },
  };
}

export const ZenNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZenNotes);
