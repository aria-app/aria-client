import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { TrackList } from '../track-list/track-list';
import { TrackerToolbar } from '../tracker-toolbar/tracker-toolbar';
import { TrackEditingModal } from '../track-editing-modal/track-editing-modal';
import './tracker.scss';

const { Timeline } = shared.components;
const { createSequence, createTrack } = shared.helpers;

export class Tracker extends React.PureComponent {
  static propTypes = {
    isStopped: PropTypes.bool.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceDelete: PropTypes.func.isRequired,
    onSequenceDeselect: PropTypes.func.isRequired,
    onSequenceExtend: PropTypes.func.isRequired,
    onSequenceMoveLeft: PropTypes.func.isRequired,
    onSequenceMoveRight: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onSequenceShorten: PropTypes.func.isRequired,
    onSongExtend: PropTypes.func.isRequired,
    onSongShorten: PropTypes.func.isRequired,
    onTrackAdd: PropTypes.func.isRequired,
    onTrackDelete: PropTypes.func.isRequired,
    onTrackEditingFinish: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackStage: PropTypes.func.isRequired,
    onTrackVoiceSet: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    selectedSequence: PropTypes.object.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    stagedTrack: PropTypes.object.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      h(TrackList, {
        onSequenceAdd: this.handleTrackListSequenceAdd,
        onSequenceDeselect: this.props.onSequenceDeselect,
        onSequenceOpen: this.handleTrackListSequenceOpen,
        onSequenceSelect: this.handleTrackListSequenceSelect,
        onSongExtend: this.props.onSongExtend,
        onSongShorten: this.props.onSongShorten,
        onTrackAdd: this.handleTrackListTrackAdd,
        onTrackIsMutedToggle: this.handleTrackListTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.handleTrackListTrackIsSoloingToggle,
        onTrackStage: this.handleTrackListTrackStage,
        selectedSequence: this.props.selectedSequence,
        songMeasureCount: this.props.songMeasureCount,
        tracks: this.props.tracks,
      }),
      h(Timeline, {
        isVisible: !this.props.isStopped,
        offset: (this.props.position * 2) + 100,
      }),
      h(TrackEditingModal, {
        onDelete: this.handleTrackEditingModalDelete,
        onDismiss: this.props.onTrackEditingFinish,
        onVoiceSet: this.handleTrackEditingModalVoiceSet,
        stagedTrack: this.props.stagedTrack,
      }),
    ]);
  }

  handleTrackEditingModalDelete = (track, sequences) =>
    this.props.onTrackDelete({
      sequences,
      track,
    });

  handleTrackEditingModalVoiceSet = (track, voice) =>
    this.props.onTrackVoiceSet({
      track,
      voice,
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

  handleTrackListTrackAdd = () => {
    const track = createTrack();
    this.props.onTrackAdd({
      sequence: createSequence({
        trackId: track.id,
      }),
      track,
    });
  }

  handleTrackListTrackIsMutedToggle = track =>
    this.props.onTrackIsMutedToggle({
      track,
    });

  handleTrackListTrackIsSoloingToggle = track =>
    this.props.onTrackIsSoloingToggle({
      track,
    });

  handleTrackListSequenceAdd = (track, position) =>
    this.props.onSequenceAdd({
      sequence: createSequence({
        trackId: track.id,
        position,
      }),
    });

  handleTrackListSequenceOpen = sequence =>
    this.props.onSequenceOpen({
      sequence,
    });

  handleTrackListSequenceSelect = sequence =>
    this.props.onSequenceSelect({
      sequence,
    });

  handleTrackListTrackStage = track =>
    this.props.onTrackStage({
      track,
    });
}
