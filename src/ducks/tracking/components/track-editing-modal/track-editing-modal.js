import _ from 'lodash';
import {
  compose,
  pure,
  setDisplayName,
  setPropTypes,
  withHandlers,
} from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import shared from 'ducks/shared';
import './track-editing-modal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { synthTypes } = shared.constants;

const component = (props) =>
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
  ]);

const composed = compose([
  setDisplayName('TrackEditingModal'),
  pure,
  setPropTypes({
    applyStagedTrack: React.PropTypes.func.isRequired,
    clearStagedTrack: React.PropTypes.func.isRequired,
    deleteStagedTrack: React.PropTypes.func.isRequired,
    updateStagedSynthType: React.PropTypes.func.isRequired,
    stagedTrack: React.PropTypes.object,
  }),
  withHandlers({
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
])(component);

export const TrackEditingModal = composed;
