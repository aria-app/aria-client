import _ from 'lodash';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './track-editing-modal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { synthTypes } = shared.constants;

const component = props =>
  h(Modal, {
    className: 'track-editing-modal',
    confirmText: 'DONE',
    isOpen: !_.isEmpty(props.stagedTrack),
    onConfirm: props.dismiss,
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
          onSelect: props.onSynthTypeSelect,
        }),
      ]),
      h(Button, {
        className: 'track-editing-modal__delete-button',
        onPress: props.onDeletePress,
        text: 'Delete',
      }),
    ]),
  ]);

const composed = compose(
  setDisplayName('TrackEditingModal'),
  pure,
  setPropTypes({
    delete: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    setSynthType: React.PropTypes.func.isRequired,
    stagedTrack: React.PropTypes.object.isRequired,
  }),
  mapProps(props => ({
    ...props,
    synthTypeList: Object.keys(synthTypes).map(key => ({
      text: synthTypes[key],
      id: synthTypes[key],
    })),
  })),
  withHandlers({
    onDeletePress: props => () => {
      props.delete([props.stagedTrack.id]);
    },
    onSynthTypeSelect: props => (item) => {
      props.setSynthType(props.stagedTrack.id, item.id);
    },
  }),
)(component);

export const TrackEditingModal = composed;
