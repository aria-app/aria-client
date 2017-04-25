import { connect } from 'react-redux';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { TrackEditingModal } from './track-editing-modal';

export const TrackEditingModalContainer = connect(state => ({
  stagedTrack: selectors.getStagedTrack(state),
}), {
  onDelete: tracksData.actions.trackDeleted,
  onDismiss: tracksData.actions.trackEditingFinished,
  onSynthTypeSet: tracksData.actions.trackSynthTypeSet,
})(TrackEditingModal);
