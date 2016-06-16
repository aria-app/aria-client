import { connect } from 'react-redux';
import song from 'ducks/song';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import * as selectors from '../../selectors';

export const TrackerToolbarContainer = connect((state) => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
}), {
  openSequence: song.actions.openSequence,
})(TrackerToolbar);
