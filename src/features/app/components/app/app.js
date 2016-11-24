import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import contextMenu from '../../../context-menu';
import sequencing from '../../../sequencing';
import tracking from '../../../tracking';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { UploadOverlayContainer } from '../upload-overlay/upload-overlay-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import './app.scss';

const { SequencerContainer } = sequencing.components;
const { ContextMenuContainer } = contextMenu.components;
const { Tracker } = tracking.components;

const component = props => h('.app', {
  onDragEnter: props.onDragEnter,
  onDragLeave: props.onDragLeave,
  onDragOver: props.onDragOver,
  onDrop: props.onDrop,
}, [
  props.contentComponent,
  h(SongToolbarContainer),
  h(BPMModalContainer),
  h(ContextMenuContainer),
  h(UploadOverlayContainer),
]);

const composed = compose(
  setDisplayName('App'),
  pure,
  setPropTypes({
    startDraggingFile: React.PropTypes.func.isRequired,
    isSequenceOpen: React.PropTypes.bool.isRequired,
  }),
  mapProps(props => ({
    ...props,
    contentComponent: props.isSequenceOpen
      ? h(SequencerContainer)
      : h(Tracker),
  })),
  withHandlers({
    onDragEnter: props => (e) => {
      props.startDraggingFile();
      e.preventDefault();
      e.stopPropagation();
    },
    onDragOver: () => (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onDrop: () => (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
  }),
)(component);

export const App = composed;
