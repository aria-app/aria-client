import { connect } from 'react-redux';

import audio from '../../audio';
import shared from '../../shared';
import song from '../../song';
import TracksEditor from './TracksEditor';

export default connect(
  (state) => ({
    isLoading: song.selectors.getIsSongLoading(state),
    isRedoEnabled: song.selectors.getIsRedoEnabled(state),
    isUndoEnabled: song.selectors.getIsUndoEnabled(state),
    isStopped: audio.selectors.getIsStopped(state),
    position: audio.selectors.getPosition(state),
    songMeasureCount: song.selectors.getMeasureCount(state),
    sequences: song.selectors.getSequencesArray(state),
    tracks: song.selectors.getDeepTracksArray(state),
  }),
  {
    onLoad: shared.actions.routeSongEditorLoaded,
    onPositionSet: audio.actions.positionSetRequestStarted,
    onRedo: song.actions.redoRequested,
    onSequenceAdd: song.actions.sequenceAdded,
    onSequenceDelete: song.actions.sequenceDeleted,
    onSequenceDuplicate: song.actions.sequenceDuplicated,
    onSequenceEdit: song.actions.sequenceEdited,
    onSongMeasureCountChange: song.actions.measureCountSet,
    onTrackAdd: song.actions.trackAdded,
    onTrackDelete: song.actions.trackDeleted,
    onTrackVoiceSet: song.actions.trackVoiceSet,
    onTrackVolumeSet: song.actions.trackVolumeSet,
    onUndo: song.actions.undoRequested,
  },
)(TracksEditor);
