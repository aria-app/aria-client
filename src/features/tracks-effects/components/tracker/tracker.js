import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Tracks } from '../tracks/tracks';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import { TrackEditingModal } from '../track-editing-modal/track-editing-modal';
import './tracker.scss';

const { Timeline } = shared.components;

export class Tracker extends React.PureComponent {
  static propTypes = {
    mutedTrackIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onSequenceAdd: React.PropTypes.func.isRequired,
    onSequenceContextMenu: React.PropTypes.func.isRequired,
    onSequenceDelete: React.PropTypes.func.isRequired,
    onSequenceDeselect: React.PropTypes.func.isRequired,
    onSequenceExtend: React.PropTypes.func.isRequired,
    onSequenceMoveLeft: React.PropTypes.func.isRequired,
    onSequenceMoveRight: React.PropTypes.func.isRequired,
    onSequenceOpen: React.PropTypes.func.isRequired,
    onSequenceSelect: React.PropTypes.func.isRequired,
    onSequenceShorten: React.PropTypes.func.isRequired,
    onSongExtend: React.PropTypes.func.isRequired,
    onSongShorten: React.PropTypes.func.isRequired,
    onTrackAdd: React.PropTypes.func.isRequired,
    onTrackDelete: React.PropTypes.func.isRequired,
    onTrackEditingFinish: React.PropTypes.func.isRequired,
    onTrackIsMutedToggle: React.PropTypes.func.isRequired,
    onTrackIsSoloingToggle: React.PropTypes.func.isRequired,
    onTrackStage: React.PropTypes.func.isRequired,
    onTrackSynthTypeSet: React.PropTypes.func.isRequired,
    selectedSequence: React.PropTypes.object.isRequired,
    selectedSequenceId: React.PropTypes.string.isRequired,
    soloingTrackIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    stagedTrack: React.PropTypes.object.isRequired,
    stagedTrackSequences: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    tracks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  }

  render() {
    return h('.tracker', [
      h(TrackerToolbar, {
        onSequenceDelete: this.props.onSequenceDelete,
        onSequenceExtend: this.props.onSequenceExtend,
        onSequenceMoveLeft: this.props.onSequenceMoveLeft,
        onSequenceMoveRight: this.props.onSequenceMoveRight,
        onSequenceOpen: this.props.onSequenceOpen,
        onSequenceShorten: this.props.onSequenceShorten,
        selectedSequence: this.props.selectedSequence,
      }),
      h(Tracks, {
        mutedTrackIds: this.props.mutedTrackIds,
        onSequenceAdd: this.props.onSequenceAdd,
        onSequenceContextMenu: this.props.onSequenceContextMenu,
        onSequenceDeselect: this.props.onSequenceDeselect,
        onSequenceOpen: this.props.onSequenceOpen,
        onSequenceSelect: this.props.onSequenceSelect,
        onSongExtend: this.props.onSongExtend,
        onSongShorten: this.props.onSongShorten,
        onTrackAdd: this.props.onTrackAdd,
        onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
        onTrackStage: this.props.onTrackStage,
        selectedSequenceId: this.props.selectedSequenceId,
        soloingTrackIds: this.props.soloingTrackIds,
        songMeasureCount: this.props.songMeasureCount,
        tracks: this.props.tracks,
      }),
      h(Timeline, {
        isVisible: false,
        offset: (0 * 2) + 100,
      }),
      h(TrackEditingModal, {
        onDelete: this.props.onTrackDelete,
        onDismiss: this.props.onTrackEditingFinish,
        onSynthTypeSet: this.props.onTrackSynthTypeSet,
        stagedTrack: this.props.stagedTrack,
        stagedTrackSequences: this.props.stagedTrackSequences,
      }),
    ]);
  }
}
