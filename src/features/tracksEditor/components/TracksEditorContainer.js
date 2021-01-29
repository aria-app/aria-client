import { connect } from 'react-redux';

import song from '../../song';
import TracksEditor from './TracksEditor';

export default connect(() => ({}), {
  onSequenceAdd: song.actions.sequenceAdded,
  onSequenceDelete: song.actions.sequenceDeleted,
  onSequenceDuplicate: song.actions.sequenceDuplicated,
  onSongMeasureCountChange: song.actions.measureCountSet,
  onTrackAdd: song.actions.trackAdded,
  onTrackDelete: song.actions.trackDeleted,
  onTrackVoiceSet: song.actions.trackVoiceSet,
  onTrackVolumeSet: song.actions.trackVolumeSet,
})(TracksEditor);
