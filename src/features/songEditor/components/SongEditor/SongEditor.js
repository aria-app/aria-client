import Dawww from 'dawww';
import find from 'lodash/fp/find';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { hideIf, showIf } from 'react-render-helpers';
import styled from 'styled-components/macro';
import shared from '../../../shared';
import { SongInfoModal } from '../SongInfoModal/SongInfoModal';
import { TrackList } from '../TrackList/TrackList';
import { TrackEditingModal } from '../TrackEditingModal/TrackEditingModal';
import { SongEditorToolbar } from '../SongEditorToolbar/SongEditorToolbar';

const { Timeline } = shared.components;
const { SYNC_STATES } = shared.constants;

const LoadingIndicator = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
`;

const StyledSongEditor = styled(HotKeys)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  position: relative;
`;

export class SongEditor extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isRedoEnabled: PropTypes.bool.isRequired,
    isStopped: PropTypes.bool.isRequired,
    isUndoEnabled: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceDelete: PropTypes.func.isRequired,
    onSequenceDuplicate: PropTypes.func.isRequired,
    onSequenceEdit: PropTypes.func.isRequired,
    onSequenceExtend: PropTypes.func.isRequired,
    onSequenceMoveLeft: PropTypes.func.isRequired,
    onSequenceMoveRight: PropTypes.func.isRequired,
    onSequenceShorten: PropTypes.func.isRequired,
    onSongExtend: PropTypes.func.isRequired,
    onSongMeasureCountChange: PropTypes.func.isRequired,
    onSongShorten: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onTrackAdd: PropTypes.func.isRequired,
    onTrackDelete: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackVoiceSet: PropTypes.func.isRequired,
    onTrackVolumeSet: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    sequences: PropTypes.arrayOf(PropTypes.object).isRequired,
    song: PropTypes.object.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    syncState: PropTypes.oneOf(Object.values(SYNC_STATES)),
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    isSongInfoModalOpen: false,
    selectedSequenceId: '',
    selectedTrackId: '',
  };

  constructor(props) {
    super(props);

    this.focusRef = React.createRef();
  }

  componentDidMount() {
    this.props.onLoad(this.props.match.params.songId);

    this.focusRef.current.focus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.song.name !== this.props.song.name) {
      window.document.title = `${this.props.song.name} - Zen Sequencer`;
    }
  }

  render() {
    return (
      <StyledSongEditor
        focused={true}
        handlers={this.getKeyHandlers()}>
        <div ref={this.focusRef} tabIndex={-1}/>
        {showIf(this.props.isLoading)(
          <LoadingIndicator>
            LOADING SONG...
          </LoadingIndicator>
        )}
        {hideIf(this.props.isLoading)(
          <React.Fragment>
            <TrackList
              isStopped={this.props.isStopped}
              onPositionSet={this.props.onPositionSet}
              onSequenceAdd={this.handleTrackListSequenceAdd}
              onSequenceDelete={this.props.onSequenceDelete}
              onSequenceEdit={this.props.onSequenceEdit}
              onSequenceDeselect={this.handleTrackListSequenceDeselect}
              onSequenceOpen={this.openSequence}
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
              onPause={this.props.onPause}
              onPlay={this.props.onPlay}
              onRedo={this.redo}
              onSequenceDelete={this.deleteSelectedSequence}
              onSequenceDuplicate={this.duplicateSelectedSequence}
              onSequenceExtend={() => {}}
              onSequenceMoveLeft={() => {}}
              onSequenceMoveRight={() => {}}
              onSequenceOpen={this.openSequence}
              onSequenceShorten={() => {}}
              onSongInfoOpen={this.openSongInfo}
              onStop={this.props.onStop}
              onUndo={this.undo}
              playbackState={this.props.playbackState}
              selectedSequence={this.getSelectedSequence()}
              syncState={this.props.syncState}
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
              onReturnToDashboard={this.returnToDashboard}
              onSignOut={this.signOut}
              song={this.props.song}
            />
            <TrackEditingModal
              onDelete={this.deleteTrack}
              onDismiss={this.deselectTrack}
              onVoiceSet={this.props.onTrackVoiceSet}
              onVolumeSet={this.props.onTrackVolumeSet}
              stagedTrack={this.getSelectedTrack()}
            />
          </React.Fragment>
        )}
      </StyledSongEditor>
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
    find(
      s => s.id === this.state.selectedSequenceId,
      this.props.sequences,
    ) || {};

  getSelectedTrack = () =>
    find(
      t => t.id === this.state.selectedTrackId,
      this.props.tracks,
    ) || {};

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
    this.openSequence(this.getSelectedSequence());
  };

  handleSongEditorToolbarSequenceShorten = () => {
    if (this.getSelectedSequence().measureCount < 2) return;

    this.props.onSequenceShorten(this.getSelectedSequence());
  }

  openSequence = (sequence) => {
    this.props.history.push(`${this.props.match.url}/sequencer/${sequence.id}`);
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

  returnToDashboard = () => {
    this.props.history.push('/');
  }

  selectTrack = (track) => {
    this.setState({
      selectedTrackId: track.id,
    });
  };

  signOut = () => {
    this.props.history.push('/sign-out');
  }

  undo = () => {
    if (!this.props.isUndoEnabled) return;

    this.props.onUndo();
  }
}
