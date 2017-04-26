import { connect } from 'react-redux';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { TrackerToolbar } from './tracker-toolbar';

export const TrackerToolbarContainer = connect(state => ({
  selectedSequence: selectors.getSelectedSequence(state),
}), {
  onSequenceDelete: tracksData.actions.sequenceDeleted,
  onSequenceExtend: tracksData.actions.sequenceExtended,
  onSequenceMoveLeft: tracksData.actions.sequenceNudgedLeft,
  onSequenceMoveRight: tracksData.actions.sequenceNudgedRight,
  onSequenceOpen: tracksData.actions.sequenceOpened,
  onSequenceShorten: tracksData.actions.sequenceShortened,
})(TrackerToolbar);
