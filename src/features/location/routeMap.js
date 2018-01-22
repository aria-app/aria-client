import shared from '../shared';

export default {
  [shared.actions.TRACKER_LOADED]: '/',
  [shared.actions.EDIT_TRACK_LOADED]: '/edit-track/:trackToEditId',
  [shared.actions.SEQUENCER_LOADED]: '/sequencer/:sequenceId',
};
