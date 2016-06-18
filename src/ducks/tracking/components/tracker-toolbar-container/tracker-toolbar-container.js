import { connect } from 'react-redux';
import song from 'ducks/song';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackerToolbarContainer = connect((state) => ({
  selectedSequence: selectors.getSelectedSequence(state),
}), {
  deleteSequence: actions.deleteSequence,
  extendSequence: actions.extendSequence,
  moveSequenceLeft: actions.moveSequenceLeft,
  moveSequenceRight: actions.moveSequenceRight,
  openSequence: song.actions.openSequence,
  shortenSequence: actions.shortenSequence,
})(TrackerToolbar);
