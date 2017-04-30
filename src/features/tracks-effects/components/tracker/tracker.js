import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Tracks } from '../tracks/tracks';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import { TrackEditingModal } from '../track-editing-modal/track-editing-modal';
import './tracker.scss';

const { Timeline } = shared.components;
const { createSequence, createTrack } = shared.helpers;

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
        onSequenceDelete: this.handleTrackerToolbarSequenceDelete,
        onSequenceExtend: this.handleTrackerToolbarSequenceExtend,
        onSequenceMoveLeft: this.handleTrackerToolbarSequenceMoveLeft,
        onSequenceMoveRight: this.handleTrackerToolbarSequenceMoveRight,
        onSequenceOpen: this.handleTrackerToolbarSequenceOpen,
        onSequenceShorten: this.handleTrackerToolbarSequenceShorten,
        selectedSequence: this.props.selectedSequence,
      }),
      h(Tracks, {
        mutedTrackIds: this.props.mutedTrackIds,
        onSequenceAdd: this.handleTracksSequenceAdd,
        onSequenceContextMenu: this.props.onSequenceContextMenu,
        onSequenceDeselect: this.props.onSequenceDeselect,
        onSequenceOpen: this.handleTracksSequenceOpen,
        onSequenceSelect: this.handleTracksSequenceSelect,
        onSongExtend: this.props.onSongExtend,
        onSongShorten: this.props.onSongShorten,
        onTrackAdd: this.handleTracksTrackAdd,
        onTrackIsMutedToggle: this.handleTracksTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.handleTracksTrackIsSoloingToggle,
        onTrackStage: this.handleTracksTrackStage,
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
        onDelete: this.handleTrackEditingModalDelete,
        onDismiss: this.props.onTrackEditingFinish,
        onSynthTypeSet: this.handleTrackEditingModalSynthTypeSet,
        stagedTrack: this.props.stagedTrack,
        stagedTrackSequences: this.props.stagedTrackSequences,
      }),
    ]);
  }

  handleTrackEditingModalDelete = (track, sequences) =>
    this.props.onTrackDelete({
      sequences,
      track,
    });

  handleTrackEditingModalSynthTypeSet = (track, synthType) =>
    this.props.onTrackSynthTypeSet({
      synthType,
      track,
    });

  handleTrackerToolbarSequenceDelete = () =>
    this.props.onSequenceDelete({
      sequence: this.props.selectedSequence,
    });

  handleTrackerToolbarSequenceExtend = () =>
    this.props.onSequenceExtend({
      sequence: this.props.selectedSequence,
    });

  handleTrackerToolbarSequenceMoveLeft = () =>
    this.props.onSequenceMoveLeft({
      sequence: this.props.selectedSequence,
    });

  handleTrackerToolbarSequenceMoveRight = () =>
    this.props.onSequenceMoveRight({
      sequence: this.props.selectedSequence,
    });

  handleTrackerToolbarSequenceOpen = () =>
    this.props.onSequenceOpen({
      sequence: this.props.selectedSequence,
    });

  handleTrackerToolbarSequenceShorten = () => {
    if (this.props.selectedSequence.measureCount < 2) return;
    this.props.onSequenceShorten({
      sequence: this.props.selectedSequence,
    });
  }

  handleTracksTrackAdd = () => {
    const track = createTrack();
    this.props.onTrackAdd({
      sequence: createSequence({
        trackId: track.id,
      }),
      track,
    });
  }

  handleTracksTrackIsMutedToggle = track =>
    this.props.onTrackIsMutedToggle({
      track,
    });

  handleTracksTrackIsSoloingToggle = track =>
    this.props.onTrackIsSoloingToggle({
      track,
    });

  handleTracksSequenceAdd = (track, position) =>
    this.props.onSequenceAdd({
      sequence: createSequence({
        trackId: track.id,
        position,
      }),
    });

  handleTracksSequenceOpen = sequence =>
    this.props.onSequenceOpen({
      sequence,
    });

  handleTracksSequenceSelect = sequence =>
    this.props.onSequenceSelect({
      sequence,
    });

  handleTracksTrackStage = track =>
    this.props.onTrackStage({
      track,
    });
}
