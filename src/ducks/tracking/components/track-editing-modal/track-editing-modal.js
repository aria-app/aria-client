import _ from 'lodash';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import shared from 'ducks/shared';
import './track-editing-modal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { synthTypes } = shared.constants;

const component = (props) =>
  h(Modal, {
    className: 'track-editing-modal',
    isOpen: !_.isEmpty(props.stagedTrack),
    onConfirm: props.applyStagedTrack,
    onCancel: props.clearStagedTrack,
    titleText: 'Edit Track',
  }, [
    h('.track-editing-modal__content', [
      h('.track-editing-modal__synth-dropdown', [
        h('.track-editing-modal__synth-dropdown__label', [
          'Synth Type:',
        ]),
        h(DropdownList, {
          className: 'track-editing-modal__synth-dropdown__list',
          items: props.synthTypeList,
          selectedId: props.stagedTrack ? props.stagedTrack.synthType : '',
          onSelect: (item) => props.updateStagedSynthType(item.id),
        }),
      ]),
      h(Button, {
        className: 'track-editing-modal__delete-button',
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
    stagedTrack: React.PropTypes.object.isRequired,
    updateStagedSynthType: React.PropTypes.func.isRequired,
  }),
  mapProps((props) => ({
    ...props,
    synthTypeList: Object.keys(synthTypes).map(key => ({
      text: synthTypes[key],
      id: synthTypes[key],
    })),
  })),
])(component);

export const TrackEditingModal = composed;
