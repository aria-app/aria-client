import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracker } from '../tracker/tracker';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackerContainer = connect((state) => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  stagedTrack: selectors.getStagedTrack(state),
}), {
  addTrack: song.actions.addTrack,
  applyStagedTrack: actions.applyStagedTrack,
  clearStagedTrack: actions.clearStagedTrack,
  deleteStagedTrack: actions.deleteStagedTrack,
  setActiveSequenceId: song.actions.setActiveSequenceId,
  setStagedTrack: actions.setStagedTrack,
  updateStagedTrackSynthType: actions.updateStagedTrackSynthType,
})(Tracker);
