import React from 'react';
import h from 'react-hyperscript';
import contextMenu from '../../../context-menu';
import sequencing from '../../../sequencing';
import shared from '../../../shared';
import tracking from '../../../tracking';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { UploadOverlayContainer } from '../upload-overlay/upload-overlay-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import './app.scss';

const { ContextMenuContainer } = contextMenu.components;
const { SequencerContainer } = sequencing.components;
const { hideIf, showIf } = shared.helpers;
const { Tracker } = tracking.components;

export class App extends React.Component {
  static propTypes = {
    isSequenceOpen: React.PropTypes.bool.isRequired,
    startDraggingFile: React.PropTypes.func.isRequired,
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
        h(Tracker),
      ),
      h(SongToolbarContainer),
      h(BPMModalContainer),
      h(ContextMenuContainer),
      h(UploadOverlayContainer),
    ]);
  }

  handleDragEnter = (e) => {
    this.props.startDraggingFile();
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
