import {
  compose,
  mapProps,
  pure,
  setDisplayName,
  setPropTypes,
  withHandlers,
} from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import shared from 'ducks/shared';
import { TracksContainer } from '../tracks-container/tracks-container';
import './tracker.scss';

const { Button, DropdownList, IconButton, Modal, Toolbar } = shared.components;
const { synthTypes } = shared.constants;

const component = (props) =>
  h('.tracker', {
    style: props.style,
  }, [
    h(Toolbar, {
      leftItems: [
        // h(IconButton, {
        //   icon: 'plus',
        //   onPress: props.addTrack,
        // }),
        h(IconButton, {
          icon: 'pencil',
          onPress: props.editTrack,
        }),
        ...(props.selectedSequenceId !== -1
          ? props.selectedSequenceItems
          : []),
      ],
    }),
    h(TracksContainer, {
      editSequence: props.editSequence,
    }),
    h(Modal, {
      isOpen: !!props.stagedTrack,
      onConfirm: props.onModalConfirm,
      onCancel: props.onModalCancel,
      titleText: 'Edit Track',
    }, [
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        },
      }, [
        h('div', [
          h('div', {
            marginBottom: 16,
          }, [
            'Synth Type:',
          ]),
          h(DropdownList, {
            style: {
              width: 128,
            },
            items: [
              ...Object.keys(synthTypes).map(key => ({
                text: synthTypes[key],
                id: synthTypes[key],
              })),
            ],
            selectedId: props.stagedTrack ? props.stagedTrack.synthType : '',
            onSelect: (item) => props.updateStagedTrackSynthType(item.id),
          }),
        ]),
        h(Button, {
          style: {
            backgroundColor: '#d63',
          },
          onPress: props.deleteTrack,
          text: 'Delete',
        }),
      ]),
    ]),
  ]);

const composed = compose([
  setDisplayName('Tracker'),
  pure,
  setPropTypes({
    addTrack: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.number.isRequired,
    setActiveSequenceId: React.PropTypes.func.isRequired,
    setStagedTrack: React.PropTypes.func.isRequired,
    updateTrack: React.PropTypes.func.isRequired,
    updateStagedTrackSynthType: React.PropTypes.func.isRequired,
    stagedTrack: React.PropTypes.object,
    decrementSequenceLength: React.PropTypes.func.isRequired,
    decrementSequencePosition: React.PropTypes.func.isRequired,
    incrementSequenceLength: React.PropTypes.func.isRequired,
    incrementSequencePosition: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    deleteTrack: (props) => () => {
      console.log('Deleting Track');
      props.setStagedTrack(undefined);
    },
    editSequence: (props) => () => {
      props.setActiveSequenceId(props.selectedSequenceId);
    },
    onModalCancel: (props) => () => {
      props.setStagedTrack(undefined);
    },
    onModalConfirm: (props) => () => {
      props.updateTrack(props.stagedTrack);
      props.setStagedTrack(undefined);
    },
    updateStagedTrackSynthType: (props) => (synthType) => {
      props.updateStagedTrackSynthType(synthType);
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
