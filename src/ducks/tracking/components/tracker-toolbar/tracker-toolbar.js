import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import shared from 'ducks/shared';
import './tracker-toolbar.scss';

const { IconButton, Toolbar } = shared.components;

const component = (props) => h(Toolbar, {
  className: 'tracker-toolbar',
  position: 'top',
  isAlternate: !!props.selectedSequenceId,
  alternateLeftItems: [
    props.sequenceActions,
  ],
});

const composed = compose(
  setDisplayName('TrackerToolbar'),
  pure,
  setPropTypes({
    openSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string.isRequired,
  }),
  mapProps((props) => ({
    ...props,
    sequenceActions: h('.tracker-toolbar__sequence-actions', [
      h(IconButton, {
        icon: 'pencil',
        onPress: () => props.openSequence(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'trash',
        onPress: () => props.deleteSequence(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'long-arrow-left',
        onPress: () => props.shortenSequence(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'arrow-left',
        onPress: () => props.moveSequenceLeft(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'arrow-right',
        onPress: () => props.moveSequenceRight(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'long-arrow-right',
        onPress: () => props.extendSequence(props.selectedSequenceId),
      }),
    ]),
  })),
)(component);

export const TrackerToolbar = composed;
