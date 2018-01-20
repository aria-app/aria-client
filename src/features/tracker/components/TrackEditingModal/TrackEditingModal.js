import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './TrackEditingModal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { voices } = shared.constants;

export class TrackEditingModal extends React.PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onVoiceSet: PropTypes.func.isRequired,
    stagedTrack: PropTypes.object.isRequired,
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
        h('.track-editing-modal__content__voice-dropdown', [
          h('.track-editing-modal__content__voice-dropdown__label', [
            'Voice:',
          ]),
          h(DropdownList, {
            className: 'track-editing-modal__content__voice-dropdown__list',
            items: getVoiceList(),
            selectedId: this.getSelectedId(),
            onSelectedIdChange: this.handleContentVoiceDropdownListSelectedIdChange,
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
      ? this.props.stagedTrack.voice
      : '');

  handleContentDeleteButtonClick = () =>
    this.props.onDelete(
      this.props.stagedTrack,
    );

  handleContentVoiceDropdownListSelectedIdChange = voice =>
    this.props.onVoiceSet(
      this.props.stagedTrack,
      voice,
    );
}

export function getVoiceList() {
  return Object.keys(voices).map(key => ({
    text: voices[key],
    id: voices[key],
  }));
}
