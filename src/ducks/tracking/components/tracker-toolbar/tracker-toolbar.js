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

const composed = compose([
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
    ]),
  })),
])(component);

export const TrackerToolbar = composed;