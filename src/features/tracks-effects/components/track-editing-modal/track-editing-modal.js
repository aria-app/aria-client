import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './track-editing-modal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { synthTypes } = shared.constants;

export class TrackEditingModal extends React.PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onSynthTypeSet: PropTypes.func.isRequired,
    stagedTrack: PropTypes.object.isRequired,
    stagedTrackSequences: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return h(Modal, {
      className: 'track-editing-modal',
      confirmText: 'done',
      isOpen: this.getIsOpen(),
      onConfirm: this.props.onDismiss,
      titleText: 'Edit Track',
    }, [
      h('.track-editing-modal__content', [
        h('.track-editing-modal__content__synth-dropdown', [
          h('.track-editing-modal__content__synth-dropdown__label', [
            'Synth Type:',
          ]),
          h(DropdownList, {
            className: 'track-editing-modal__content__synth-dropdown__list',
            items: getSynthTypeList(),
            selectedId: this.getSelectedId(),
            onSelectedIdChange: this.handleContentSynthDropdownListSelectedIdChange,
          }),
        ]),
        h(Button, {
          className: 'track-editing-modal__content__delete-button',
          onClick: this.handleContentDeleteButtonClick,
          text: 'delete',
        }),
      ]),
    ]);
  }

  getIsOpen = () =>
    !isEmpty(this.props.stagedTrack);

  getSelectedId = () =>
    (this.props.stagedTrack
      ? this.props.stagedTrack.synthType
      : '');

  handleContentDeleteButtonClick = () =>
    this.props.onDelete(
      this.props.stagedTrack,
      this.props.stagedTrackSequences,
    );

  handleContentSynthDropdownListSelectedIdChange = synthType =>
    this.props.onSynthTypeSet(
      this.props.stagedTrack,
      synthType,
    );
}

export function getSynthTypeList() {
  return Object.keys(synthTypes).map(key => ({
    text: synthTypes[key],
    id: synthTypes[key],
  }));
}
