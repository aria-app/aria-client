import { connect } from 'react-redux';
import { TrackEditingModal } from '../track-editing-modal/track-editing-modal';
import song from 'ducks/song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackEditingModalContainer = connect((state) => ({
  stagedTrack: selectors.getStagedTrack(state),
}), {
  delete: song.actions.deleteTrackById,
  dismiss: actions.trackEditingFinished,
  setSynthType: song.actions.setTrackSynthType,
})(TrackEditingModal);
