import { connect } from 'react-redux';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { TrackerToolbar } from './tracker-toolbar';

export const TrackerToolbarContainer = connect(state => ({
  selectedSequence: selectors.getSelectedSequence(state),
}), {
  onSelectedSequenceMoveLeft: tracksData.actions.selectedSequenceNudgedLeft,
  onSelectedSequenceMoveRight: tracksData.actions.selectedSequenceNudgedRight,
  onSelectedSequenceOpen: tracksData.actions.selectedSequenceOpened,
  onSequenceDelete: tracksData.actions.sequenceDeleted,
  onSequenceExtend: tracksData.actions.sequenceExtended,
  onSequenceShorten: tracksData.actions.sequenceShortened,
})(TrackerToolbar);
