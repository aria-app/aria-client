import { connect } from 'react-redux';
import song from 'ducks/song';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackerToolbarContainer = connect(state => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
}), {
  deleteSequence: actions.sequenceDeleted,
  extendSequence: actions.sequenceExtended,
  moveSequenceLeft: actions.sequenceNudgedLeft,
  moveSequenceRight: actions.sequenceNudgedRight,
  openSequence: song.actions.sequenceOpened,
  shortenSequence: actions.sequenceShortened,
})(TrackerToolbar);
