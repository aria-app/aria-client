import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
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
        // h(IconButton, {
        //   icon: 'plus',
        //   onPress: () => props.addTrack({
        //     synthType: shared.constants.synthTypes.SAWTOOTH,
        //   }),
        // }),
        // h(IconButton, {
        //   icon: 'trash',
        //   onPress: () => console.log('Delete!'),
        // }),
        ...(props.selectedSequenceId !== -1
          ? props.selectedSequenceItems
          : []),
      ],
    }),
    h(TracksContainer, {
      editSequence: props.editSequence,
    }),
  ]);

const composed = compose([
  setDisplayName('Tracker'),
  pure,
  setPropTypes({
    addTrack: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.number.isRequired,
    setActiveSequenceId: React.PropTypes.func.isRequired,
    decrementSequenceLength: React.PropTypes.func.isRequired,
    decrementSequencePosition: React.PropTypes.func.isRequired,
    incrementSequenceLength: React.PropTypes.func.isRequired,
    incrementSequencePosition: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    editSequence: (props) => () => {
      props.setActiveSequenceId(props.selectedSequenceId);
    },
  }),
  mapProps((props) => ({
    ...props,
    selectedSequenceItems: [
      h(IconButton, {
        icon: 'pencil',
        onPress: props.editSequence,
      }),
      h(IconButton, {
        icon: 'arrow-left',
        onPress: () => props.decrementSequencePosition(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'arrow-right',
        onPress: () => props.incrementSequencePosition(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'long-arrow-left',
        onPress: () => props.decrementSequenceLength(props.selectedSequenceId),
      }),
      h(IconButton, {
        icon: 'long-arrow-right',
        onPress: () => props.incrementSequenceLength(props.selectedSequenceId),
      }),
    ],
  })),
])(component);

export const Tracker = composed;
