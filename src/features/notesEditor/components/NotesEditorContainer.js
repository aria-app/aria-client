import { connect } from 'react-redux';

import song from '../../song';
import NotesEditor from './NotesEditor';

export default connect(
  () => ({}),
  {
    onDelete: song.actions.notesDeleted,
    onDraw: song.actions.noteDrawn,
    onDrag: song.actions.notesDragged,
    onDuplicate: song.actions.notesDuplicated,
    onErase: song.actions.noteErased,
    onNudge: song.actions.notesNudged,
    onOctaveDown: song.actions.notesMovedOctaveDown,
    onOctaveUp: song.actions.notesMovedOctaveUp,
    onResize: song.actions.notesResized,
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onNudge: (delta, notes) =>
      dispatchProps.onNudge({ sequence: stateProps.sequence, delta, notes }),
  }),
)(NotesEditor);
