import { connect } from 'react-redux';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackerToolbarContainer = connect(state => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
}), {
  deleteSequence: actions.selectedSequenceDeleted,
  extendSequence: actions.selectedSequenceExtended,
  moveSequenceLeft: actions.selectedSequenceNudgedLeft,
  moveSequenceRight: actions.selectedSequenceNudgedRight,
  openSequence: actions.selectedSequenceOpened,
  shortenSequence: actions.selectedSequenceShortened,
})(TrackerToolbar);
