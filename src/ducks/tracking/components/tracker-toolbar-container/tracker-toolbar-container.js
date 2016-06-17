import { connect } from 'react-redux';
import song from 'ducks/song';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import * as selectors from '../../selectors';

export const TrackerToolbarContainer = connect((state) => ({
  selectedSequence: selectors.getSelectedSequence(state),
}), {
  deleteSequence: song.actions.deleteSequence,
  extendSequence: song.actions.extendSequence,
  moveSequenceLeft: song.actions.moveSequenceLeft,
  moveSequenceRight: song.actions.moveSequenceRight,
  openSequence: song.actions.openSequence,
  shortenSequence: song.actions.shortenSequence,
})(TrackerToolbar);
