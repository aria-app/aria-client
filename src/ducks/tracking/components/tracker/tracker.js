import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { TracksContainer } from '../tracks-container/tracks-container';
import './tracker.scss';

const { IconButton, Toolbar } = shared.components;

const component = (props) =>
  h('.tracker', {
    style: props.style,
  }, [
    h(Toolbar, {
      leftItems: [
        h(IconButton, {
          icon: 'plus',
          onPress: () => props.addTrack({
            synthType: shared.constants.synthTypes.SAWTOOTH,
          }),
        }),
        h(IconButton, {
          icon: 'pencil',
          onPress: props.editSequence,
        }),
        h(IconButton, {
          icon: 'trash',
          onPress: () => console.log('Delete!'),
        }),
      ],
    }),
    h(TracksContainer),
  ]);

const composed = compose([
  setDisplayName('Tracker'),
  pure,
  setPropTypes({
    addTrack: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.number.isRequired,
    setActiveSequenceId: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    editSequence: (props) => () => {
      props.setActiveSequenceId(props.selectedSequenceId);
    },
  }),
])(component);

export const Tracker = composed;
