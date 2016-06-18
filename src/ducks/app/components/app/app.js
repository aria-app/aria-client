import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import contextMenu from 'ducks/context-menu';
import sequencing from 'ducks/sequencing';
import shared from 'ducks/shared';
import tracking from 'ducks/tracking';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import './app.scss';

const { SequencerContainer } = sequencing.components;
const { ContextMenuContainer } = contextMenu.components;
const { Tracker } = tracking.components;
const { doOnMount } = shared.helpers;

const component = (props) => h('.app', [
  props.contentComponent,
  h(SongToolbarContainer),
  h(BPMModalContainer),
  h(ContextMenuContainer),
]);

const composed = compose([
  setDisplayName('App'),
  pure,
  setPropTypes({
    initialize: React.PropTypes.func.isRequired,
    isSequenceOpen: React.PropTypes.bool.isRequired,
  }),
  doOnMount((props) => {
    props.initialize();
  }),
  mapProps((props) => ({
    ...props,
    contentComponent: props.isSequenceOpen
      ? h(SequencerContainer)
      : h(Tracker),
  })),
])(component);

export const App = composed;
