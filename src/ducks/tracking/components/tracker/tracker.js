import _ from 'lodash';
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
import { SongTimelineContainer } from '../song-timeline-container/song-timeline-container';
import './tracker.scss';

const { Button, DropdownList, IconButton, Modal, Toolbar } = shared.components;
const { synthTypes } = shared.constants;

const component = (props) =>
  h('.tracker', {
    style: props.style,
  }, [
    h(Toolbar, {
      leftItems: [
        h(IconButton, {
          icon: 'plus',
          onPress: props.addNewTrack,
        }),
        ...(props.selectedSequenceId
          ? props.selectedSequenceItems
          : []),
      ],
    }),
    h(TracksContainer, {
      openSequence: props.openSequence,
    }),
    h(SongTimelineContainer),
    h(Modal, {
      isOpen: !_.isEmpty(props.stagedTrack),
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
            onSelect: (item) => props.updateStagedSynthType(item.id),
          }),
        ]),
        h(Button, {
          style: {
            backgroundColor: '#d63',
          },
          onPress: props.deleteStagedTrack,
          text: 'Delete',
        }),
      ]),
    ]),
  ]);

const composed = compose([
  setDisplayName('Tracker'),
  pure,
  setPropTypes({
    addNewTrack: React.PropTypes.func.isRequired,
    applyStagedTrack: React.PropTypes.func.isRequired,
    clearStagedTrack: React.PropTypes.func.isRequired,
    deleteStagedTrack: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    stageTrack: React.PropTypes.func.isRequired,
    updateStagedSynthType: React.PropTypes.func.isRequired,
    stagedTrack: React.PropTypes.object,
  }),
  withHandlers({
    openSequence: (props) => () => {
      props.openSequence(props.selectedSequenceId);
    },
    onModalCancel: (props) => () => {
      props.clearStagedTrack();
    },
    onModalConfirm: (props) => () => {
      props.applyStagedTrack();
    },
    updateStagedSynthType: (props) => (synthType) => {
      props.updateStagedSynthType(synthType);
    },
  }),
  mapProps((props) => ({
    ...props,
    selectedSequenceItems: [
      h(IconButton, {
        icon: 'pencil',
        onPress: props.openSequence,
      }),
    ],
  })),
])(component);

export const Tracker = composed;
