import { connect } from 'react-redux';
import { TrackEditingModal } from '../track-editing-modal/track-editing-modal';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackEditingModalContainer = connect((state) => ({
  stagedTrack: selectors.getStagedTrack(state),
}), {
  applyStagedTrack: actions.applyStagedTrack,
  clearStagedTrack: actions.clearStagedTrack,
  deleteStagedTrack: actions.deleteStagedTrack,
  updateStagedSynthType: actions.updateStagedSynthType,
})(TrackEditingModal);
