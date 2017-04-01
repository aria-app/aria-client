import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import playback from '../../../playback';

export const KeysContainer = connect(() => ({}), {
  onNotePreview: playback.actions.notePreviewed,
})(Keys);
