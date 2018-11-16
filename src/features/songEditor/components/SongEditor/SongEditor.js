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
import { SongEditorToolbar } from '../SongEditorToolbar/SongEditorToolbar';
import './SongEditor.scss';

const { Timeline } = shared.components;

export class SongEditor extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isRedoEnabled: PropTypes.bool.isRequired,
    isStopped: PropTypes.bool.isRequired,
    isUndoEnabled: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
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
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackVoiceSet: PropTypes.func.isRequired,
    onTrackVolumeSet: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    sequenceMap: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    trackMap: PropTypes.object.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    isSongInfoModalOpen: false,
    selectedSequenceId: '',
    selectedTrackId: '',
  };

  render() {
    return (
      <HotKeys
        className="song-editor"
        focused={true}
        handlers={this.getKeyHandlers()}>
        <TrackList
          isStopped={this.props.isStopped}
          onPositionSet={this.props.onPositionSet}
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
          onTrackStage={this.selectTrack}
          selectedSequence={this.getSelectedSequence()}
          songMeasureCount={this.props.songMeasureCount}
          tracks={this.props.tracks}
        />
        <SongEditorToolbar
          isRedoEnabled={this.props.isRedoEnabled}
          isUndoEnabled={this.props.isUndoEnabled}
          onRedo={this.redo}
          onSequenceDelete={this.deleteSelectedSequence}
          onSequenceDuplicate={this.duplicateSelectedSequence}
          onSequenceExtend={() => {}}
          onSequenceMoveLeft={() => {}}
          onSequenceMoveRight={() => {}}
          onSequenceOpen={() => {}}
          onSequenceShorten={() => {}}
          onSongInfoOpen={this.openSongInfo}
          onUndo={this.undo}
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
          song={this.props.song}
        />
        <TrackEditingModal
          onDelete={this.deleteTrack}
          onDismiss={this.deselectTrack}
          onVoiceSet={this.props.onTrackVoiceSet}
          onVolumeSet={this.props.onTrackVolumeSet}
          stagedTrack={this.getSelectedTrack()}
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

  deleteTrack = (track) => {
    this.props.onTrackDelete(track);

    this.deselectTrack();
  }

  deselectTrack = () => {
    this.setState({
      selectedTrackId: '',
    });
  };

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
    del: this.deleteSelectedSequence,
    'ctrl+shift+d': this.duplicateSelectedSequence,
    'ctrl+z': this.undo,
    'ctrl+alt+z': this.redo,
    'meta+shift+d': this.duplicateSelectedSequence,
    'meta+z': this.undo,
    'meta+alt+z': this.redo,
  });

  getSelectedSequence = () =>
    getOr({}, `props.sequenceMap.${this.state.selectedSequenceId}`, this);

  getSelectedTrack = () =>
    getOr({}, `props.trackMap.${this.state.selectedTrackId}`, this);

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

  handleSongEditorToolbarSequenceDelete = () => {
    this.props.onSequenceDelete(this.getSelectedSequence());
  };

  handleSongEditorToolbarSequenceExtend = () => {
    this.props.onSequenceExtend(this.getSelectedSequence());
  };

  handleSongEditorToolbarSequenceMoveLeft = () => {
    this.props.onSequenceMoveLeft(this.getSelectedSequence());
  };

  handleSongEditorToolbarSequenceMoveRight = () => {
    this.props.onSequenceMoveRight(this.getSelectedSequence());
  };

  handleSongEditorToolbarSequenceOpen = () => {
    this.props.onSequenceOpen(this.getSelectedSequence());
  };

  handleSongEditorToolbarSequenceShorten = () => {
    if (this.getSelectedSequence().measureCount < 2) return;

    this.props.onSequenceShorten(this.getSelectedSequence());
  }

  openSongInfo = () => {
    this.setState({
      isSongInfoModalOpen: true,
    });
  };

  redo = () => {
    if (!this.props.isRedoEnabled) return;

    this.props.onRedo();
  }

  selectTrack = (track) => {
    this.setState({
      selectedTrackId: track.id,
    });
  };

  undo = () => {
    if (!this.props.isUndoEnabled) return;

    this.props.onUndo();
  }
}
