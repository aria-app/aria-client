import { connect } from 'react-redux';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackerToolbarContainer = connect(state => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
}), {
  onSelectedSequenceDelete: actions.selectedSequenceDeleted,
  onSelectedSequenceExtend: actions.selectedSequenceExtended,
  onSelectedSequenceMoveLeft: actions.selectedSequenceNudgedLeft,
  onSelectedSequenceMoveRight: actions.selectedSequenceNudgedRight,
  onSelectedSequenceOpen: actions.selectedSequenceOpened,
  onSelectedSequenceShorten: actions.selectedSequenceShortened,
})(TrackerToolbar);
