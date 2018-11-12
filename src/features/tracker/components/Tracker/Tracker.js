import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import shared from '../../../shared';
import { SongInfoModal } from '../SongInfoModal/SongInfoModal';
import { TrackList } from '../TrackList/TrackList';
import { TrackEditingModal } from '../TrackEditingModal/TrackEditingModal';
import { TrackerToolbar } from '../TrackerToolbar/TrackerToolbar';
import './Tracker.scss';

const { Timeline } = shared.components;

export class Tracker extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isStopped: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceDelete: PropTypes.func.isRequired,
    onSequenceDuplicate: PropTypes.func.isRequired,
    onSequenceEdit: PropTypes.func.isRequired,
    onSequenceExtend: PropTypes.func.isRequired,
    onSequenceMoveLeft: PropTypes.func.isRequired,
    onSequenceMoveRight: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceShorten: PropTypes.func.isRequired,
    onSongExtend: PropTypes.func.isRequired,
    onSongMeasureCountChange: PropTypes.func.isRequired,
    onSongShorten: PropTypes.func.isRequired,
    onTrackAdd: PropTypes.func.isRequired,
    onTrackDelete: PropTypes.func.isRequired,
    onTrackEditingFinish: PropTypes.func.isRequired,
    onTrackEditingStart: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackSequencesOrderChange: PropTypes.func.isRequired,
    onTrackVoiceSet: PropTypes.func.isRequired,
    onTrackVolumeSet: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    sequenceMap: PropTypes.object.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    trackMap: PropTypes.object.isRequired,
    trackToEditId: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    isSongInfoModalOpen: false,
    selectedSequenceId: '',
  };

  render() {
    return (
      <HotKeys
        className="tracker"
        focused={true}
        handlers={this.getKeyHandlers()}>
        <TrackList
          onSequenceAdd={this.handleTrackListSequenceAdd}
          onSequenceDelete={this.props.onSequenceDelete}
          onSequenceEdit={this.props.onSequenceEdit}
          onSequenceDeselect={this.handleTrackListSequenceDeselect}
          onSequenceOpen={this.props.onSequenceOpen}
          onSequenceSelect={this.handleTrackListSequenceSelect}
          onSongExtend={this.props.onSongExtend}
          onSongInfoPress={this.handleTrackListSongInfoPress}
          onSongShorten={this.props.onSongShorten}
          onTrackAdd={this.handleTrackListTrackAdd}
          onTrackIsMutedToggle={this.props.onTrackIsMutedToggle}
          onTrackIsSoloingToggle={this.props.onTrackIsSoloingToggle}
          onTrackSequencesOrderChange={this.props.onTrackSequencesOrderChange}
          onTrackStage={this.props.onTrackEditingStart}
          selectedSequence={this.getSelectedSequence()}
          songMeasureCount={this.props.songMeasureCount}
          tracks={this.props.tracks}
        />
        <TrackerToolbar
          onSequenceDelete={this.deleteSelectedSequence}
          onSequenceDuplicate={this.duplicateSelectedSequence}
          onSequenceExtend={() => {}}
          onSequenceMoveLeft={() => {}}
          onSequenceMoveRight={() => {}}
          onSequenceOpen={() => {}}
          onSequenceShorten={() => {}}
          onSongInfoOpen={this.openSongInfo}
          selectedSequence={this.getSelectedSequence()}
        />
        <Timeline
          isVisible={!this.props.isStopped}
          offset={(this.props.position * 2) + 16}
        />
        <SongInfoModal
          bpm={this.props.bpm}
          measureCount={this.props.songMeasureCount}
          isOpen={this.state.isSongInfoModalOpen}
          onBPMChange={this.props.onBPMChange}
          onConfirm={this.closeSongInfo}
          onMeasureCountChange={this.props.onSongMeasureCountChange}
        />
        <TrackEditingModal
          onDelete={this.handleTrackEditingModalDelete}
          onDismiss={this.props.onTrackEditingFinish}
          onVoiceSet={this.props.onTrackVoiceSet}
          onVolumeSet={this.props.onTrackVolumeSet}
          stagedTrack={this.getStagedTrack()}
        />
      </HotKeys>
    );
  }

  closeSongInfo = () => {
    this.setState({
      isSongInfoModalOpen: false,
    });
  };

  deleteSelectedSequence = (e) => {
    e.preventDefault();

    const selectedSequence = this.getSelectedSequence();

    if (isNil(selectedSequence)) return;

    this.props.onSequenceDelete(selectedSequence);
  }

  duplicateSelectedSequence = (e) => {
    e.preventDefault();

    const selectedSequence = this.getSelectedSequence();

    if (isEmpty(selectedSequence)) return;

    const duplicatedSequence = Dawww.createSequence(
      selectedSequence.trackId,
      selectedSequence.position,
      selectedSequence.measureCount,
    );

    this.props.onSequenceDuplicate(
      duplicatedSequence,
      selectedSequence,
    );

    this.setState({
      selectedSequenceId: duplicatedSequence.id,
    });
  };

  getKeyHandlers = () => ({
    backspace: this.deleteSelectedSequence,
    'ctrl+shift+d': this.duplicateSelectedSequence,
    del: this.deleteSelectedSequence,
    'meta+shift+d': this.duplicateSelectedSequence,
  });

  getSelectedSequence = () =>
    getOr({}, `props.sequenceMap.${this.state.selectedSequenceId}`, this);

  getStagedTrack = () =>
    getOr({}, `props.trackMap.${this.props.trackToEditId}`, this);

  handleTrackEditingModalDelete = (track) => {
    this.props.onTrackDelete(track);

    this.props.onTrackEditingFinish();
  }

  handleTrackListSequenceAdd = (track, position) => {
    const sequence = Dawww.createSequence(track.id, position);

    this.props.onSequenceAdd(sequence);
  };

  handleTrackListSequenceDeselect = () => {
    this.setState({
      selectedSequenceId: '',
    });
  };

  handleTrackListSequenceSelect = (sequence) => {
    this.setState({
      selectedSequenceId: sequence.id,
    });
  };

  handleTrackListTrackAdd = () => {
    const track = Dawww.createTrack();
    const sequence = Dawww.createSequence(track.id);

    this.props.onTrackAdd(track, sequence);
  };

  handleTrackerToolbarSequenceDelete = () => {
    this.props.onSequenceDelete(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceExtend = () => {
    this.props.onSequenceExtend(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceMoveLeft = () => {
    this.props.onSequenceMoveLeft(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceMoveRight = () => {
    this.props.onSequenceMoveRight(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceOpen = () => {
    this.props.onSequenceOpen(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceShorten = () => {
    if (this.getSelectedSequence().measureCount < 2) return;

    this.props.onSequenceShorten(this.getSelectedSequence());
  }

  openSongInfo = () => {
    this.setState({
      isSongInfoModalOpen: true,
    });
  };
}
