import React from 'react';
import h from 'react-hyperscript';
import contextMenu from '../../../context-menu';
import sequenceEffects from '../../../sequence-effects';
import shared from '../../../shared';
import tracksEffects from '../../../tracks-effects';
import { BPMModal } from '../bpm-modal/bpm-modal';
import { UploadOverlay } from '../upload-overlay/upload-overlay';
import { SongToolbar } from '../song-toolbar/song-toolbar';
import './app.scss';

const { ContextMenu } = contextMenu.components;
const { SequencerContainer } = sequenceEffects.components;
const { hideIf, showIf } = shared.helpers;
const { TrackerContainer } = tracksEffects.components;

export class App extends React.PureComponent {
  static propTypes = {
    bpm: React.PropTypes.number.isRequired,
    contextMenuItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    contextMenuPosition: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }).isRequired,
    isBPMModalOpen: React.PropTypes.bool.isRequired,
    isContextMenuOpen: React.PropTypes.bool.isRequired,
    isFileOver: React.PropTypes.bool.isRequired,
    isSequenceOpen: React.PropTypes.bool.isRequired,
    onBPMChange: React.PropTypes.func.isRequired,
    onBPMModalConfirm: React.PropTypes.func.isRequired,
    onBPMModalOpen: React.PropTypes.func.isRequired,
    onContextMenuIsOpenChange: React.PropTypes.func.isRequired,
    onContextMenuSelect: React.PropTypes.func.isRequired,
    onFileDragStart: React.PropTypes.func.isRequired,
    onPause: React.PropTypes.func.isRequired,
    onPlay: React.PropTypes.func.isRequired,
    onStop: React.PropTypes.func.isRequired,
    onUpload: React.PropTypes.func.isRequired,
    onUploadCancel: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    stringifiedSong: React.PropTypes.string.isRequired,
    windowHeight: React.PropTypes.number.isRequired,
    windowWidth: React.PropTypes.number.isRequired,
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
      h(ContextMenu, {
        isOpen: this.props.isContextMenuOpen,
        items: this.props.contextMenuItems,
        onIsOpenChange: this.props.onContextMenuIsOpenChange,
        onSelect: this.props.onContextMenuSelect,
        position: this.props.contextMenuPosition,
        windowHeight: this.props.windowHeight,
        windowWidth: this.props.windowWidth,
      }),
      h(UploadOverlay, {
        isFileOver: this.props.isFileOver,
        onCancel: this.props.onUploadCancel,
        onUpload: this.props.onUpload,
      }),
    ]);
  }

  handleBPMModalBPMChange = bpm =>
    this.props.onBPMChange({
      bpm,
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
}
