import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import keydown from 'react-keydown';
import sequencer from '../../../sequencer';
import shared from '../../../shared';
import tracker from '../../../tracker';
import { BPMModal } from '../bpm-modal/bpm-modal';
import { UploadOverlay } from '../upload-overlay/upload-overlay';
import { SongToolbar } from '../song-toolbar/song-toolbar';
import './app.scss';

const { SequencerContainer } = sequencer.components;
const { STARTED } = shared.constants.playbackStates;
const { hideIf, showIf } = shared.helpers;
const { TrackerContainer } = tracker.components;

export class App extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isBPMModalOpen: PropTypes.bool.isRequired,
    isFileOver: PropTypes.bool.isRequired,
    isSequenceOpen: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onBPMModalConfirm: PropTypes.func.isRequired,
    onBPMModalOpen: PropTypes.func.isRequired,
    onFileDragStart: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    onUploadCancel: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    stringifiedSong: PropTypes.string.isRequired,
  }

  render() {
    return h('.app', {
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop,
    }, [
      showIf(this.props.isSequenceOpen)(
        h(SequencerContainer),
      ),
      hideIf(this.props.isSequenceOpen)(
        h(TrackerContainer),
      ),
      h(SongToolbar, {
        bpm: this.props.bpm,
        onBPMModalOpen: this.props.onBPMModalOpen,
        onPause: this.props.onPause,
        onPlay: this.props.onPlay,
        onStop: this.props.onStop,
        playbackState: this.props.playbackState,
        stringifiedSong: this.props.stringifiedSong,
      }),
      h(BPMModal, {
        bpm: this.props.bpm,
        isOpen: this.props.isBPMModalOpen,
        onBPMChange: this.handleBPMModalBPMChange,
        onConfirm: this.props.onBPMModalConfirm,
      }),
      h(UploadOverlay, {
        isFileOver: this.props.isFileOver,
        onCancel: this.props.onUploadCancel,
        onUpload: this.handleUploadOverlayUpload,
      }),
    ]);
  }

  handleBPMModalBPMChange = bpm =>
    this.props.onBPMChange({
      bpm,
    });

  handleUploadOverlayUpload = data =>
    this.props.onUpload({
      song: data,
    });

  handleDragEnter = (e) => {
    this.props.onFileDragStart();
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  @keydown('enter')
  playPause() {
    if (this.props.playbackState === STARTED) {
      this.props.onPause();
    } else {
      this.props.onPlay();
    }
  }

  @keydown('esc')
  stop() {
    this.props.onStop();
  }
}
