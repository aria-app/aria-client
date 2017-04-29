import React from 'react';
import h from 'react-hyperscript';
import contextMenu from '../../../context-menu';
import sequenceEffects from '../../../sequence-effects';
import shared from '../../../shared';
import tracksEffects from '../../../tracks-effects';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { UploadOverlayContainer } from '../upload-overlay/upload-overlay-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import './app.scss';

const { ContextMenuContainer } = contextMenu.components;
const { SequencerContainer } = sequenceEffects.components;
const { hideIf, showIf } = shared.helpers;
const { TrackerContainer } = tracksEffects.components;

export class App extends React.Component {
  static propTypes = {
    isSequenceOpen: React.PropTypes.bool.isRequired,
    onFileDragStart: React.PropTypes.func.isRequired,
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
      h(SongToolbarContainer),
      h(BPMModalContainer),
      h(ContextMenuContainer),
      h(UploadOverlayContainer),
    ]);
  }

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
