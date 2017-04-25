import { connect } from 'react-redux';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { TrackerToolbar } from './tracker-toolbar';

// wallaby-ignore
export const TrackerToolbarContainer = connect(state => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
}), {
  onSelectedSequenceDelete: tracksData.actions.selectedSequenceDeleted,
  onSelectedSequenceExtend: tracksData.actions.selectedSequenceExtended,
  onSelectedSequenceMoveLeft: tracksData.actions.selectedSequenceNudgedLeft,
  onSelectedSequenceMoveRight: tracksData.actions.selectedSequenceNudgedRight,
  onSelectedSequenceOpen: tracksData.actions.selectedSequenceOpened,
  onSelectedSequenceShorten: tracksData.actions.selectedSequenceShortened,
})(TrackerToolbar);
