import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { TrackList } from '../TrackList/TrackList';
import { TrackerToolbar } from '../TrackerToolbar/TrackerToolbar';
import { TrackEditingModal } from '../TrackEditingModal/TrackEditingModal';
import './Tracker.scss';

const { Timeline } = shared.components;

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
        onSequenceAdd: this.props.onSequenceAdd,
        onSequenceDeselect: this.props.onSequenceDeselect,
        onSequenceOpen: this.props.onSequenceOpen,
        onSequenceSelect: this.props.onSequenceSelect,
        onSongExtend: this.props.onSongExtend,
        onSongShorten: this.props.onSongShorten,
        onTrackAdd: this.props.onTrackAdd,
        onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
        onTrackStage: this.props.onTrackStage,
        selectedSequence: this.props.selectedSequence,
        songMeasureCount: this.props.songMeasureCount,
        tracks: this.props.tracks,
      }),
      h(Timeline, {
        isVisible: !this.props.isStopped,
        offset: (this.props.position * 2) + 100,
      }),
      h(TrackEditingModal, {
        onDelete: this.props.onTrackDelete,
        onDismiss: this.props.onTrackEditingFinish,
        onVoiceSet: this.props.onTrackVoiceSet,
        stagedTrack: this.props.stagedTrack,
      }),
    ]);
  }

  handleTrackerToolbarSequenceDelete = () =>
    this.props.onSequenceDelete(this.props.selectedSequence);

  handleTrackerToolbarSequenceExtend = () =>
    this.props.onSequenceExtend(this.props.selectedSequence);

  handleTrackerToolbarSequenceMoveLeft = () =>
    this.props.onSequenceMoveLeft(this.props.selectedSequence);

  handleTrackerToolbarSequenceMoveRight = () =>
    this.props.onSequenceMoveRight(this.props.selectedSequence);

  handleTrackerToolbarSequenceOpen = () =>
    this.props.onSequenceOpen(this.props.selectedSequence);

  handleTrackerToolbarSequenceShorten = () => {
    if (this.props.selectedSequence.measureCount < 2) return;
    this.props.onSequenceShorten(this.props.selectedSequence);
  }
}
