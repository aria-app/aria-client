import { connect } from 'react-redux';
import { TrackEditingModal } from '../track-editing-modal/track-editing-modal';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

// wallaby-ignore
export const TrackEditingModalContainer = connect(state => ({
  stagedTrack: selectors.getStagedTrack(state),
}), {
  onDelete: song.actions.trackDeleted,
  onDismiss: actions.trackEditingFinished,
  onSynthTypeSet: song.actions.trackSynthTypeSet,
})(TrackEditingModal);
