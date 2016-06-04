import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracker } from '../tracker/tracker';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TrackerContainer = connect((state) => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  stagedTrack: selectors.getStagedTrack(state),
}), {
  addNewTrack: song.actions.addNewTrack,
  applyStagedTrack: actions.applyStagedTrack,
  clearStagedTrack: actions.clearStagedTrack,
  deleteStagedTrack: actions.deleteStagedTrack,
  openSequence: actions.openSequence,
  setStagedTrack: actions.setStagedTrack,
  updateStagedTrackSynthType: actions.updateStagedTrackSynthType,
})(Tracker);
