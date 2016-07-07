import React from 'react';
import h from 'react-hyperscript';
import { compose, lifecycle, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import contextMenu from '../../../context-menu';
import sequencing from '../../../sequencing';
import tracking from '../../../tracking';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import './app.scss';

const { SequencerContainer } = sequencing.components;
const { ContextMenuContainer } = contextMenu.components;
const { Tracker } = tracking.components;

const component = (props) => h('.app', [
  props.contentComponent,
  h(SongToolbarContainer),
  h(BPMModalContainer),
  h(ContextMenuContainer),
]);

const composed = compose(
  setDisplayName('App'),
  pure,
  setPropTypes({
    initialize: React.PropTypes.func.isRequired,
    isSequenceOpen: React.PropTypes.bool.isRequired,
  }),
  mapProps((props) => ({
    ...props,
    contentComponent: props.isSequenceOpen
      ? h(SequencerContainer)
      : h(Tracker),
  })),
  lifecycle({
    componentDidMount() {
      this.props.initialize();
    },
  }),
)(component);

export const App = composed;
