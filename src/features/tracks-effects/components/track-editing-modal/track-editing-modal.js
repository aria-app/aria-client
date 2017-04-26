import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './track-editing-modal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { synthTypes } = shared.constants;

export class TrackEditingModal extends React.Component {
  static propTypes = {
    onDelete: React.PropTypes.func.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    onSynthTypeSet: React.PropTypes.func.isRequired,
    stagedTrack: React.PropTypes.object.isRequired,
    stagedTrackSequences: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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

  getIsOpen() {
    return !isEmpty(this.props.stagedTrack);
  }

  getSelectedId() {
    return this.props.stagedTrack
      ? this.props.stagedTrack.synthType
      : '';
  }

  handleContentDeleteButtonClick = () => {
    this.props.onDelete({
      sequenceIds: map('id')(this.props.stagedTrackSequences),
      id: this.props.stagedTrack.id,
    });
  }

  handleContentSynthDropdownListSelectedIdChange = (synthType) => {
    this.props.onSynthTypeSet({
      track: this.props.stagedTrack.id,
      synthType,
    });
  }
}

export function getSynthTypeList() {
  return Object.keys(synthTypes).map(key => ({
    text: synthTypes[key],
    id: synthTypes[key],
  }));
}
