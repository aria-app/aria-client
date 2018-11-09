import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './TrackEditingModal.scss';

const { Button, DropdownList, Modal } = shared.components;
// This should be moved into Dawww.
const minVolume = -20;
const maxVolume = 0;
const getVolumeRangeItem = x => ({ id: x, text: String(x) });
const volumeRangeItems = map(getVolumeRangeItem, range(maxVolume, minVolume - 1));

export class TrackEditingModal extends React.PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onVoiceSet: PropTypes.func.isRequired,
    onVolumeSet: PropTypes.func.isRequired,
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
            selectedId: getOr('', 'props.stagedTrack.voice', this),
            onSelectedIdChange: this.handleContentVoiceDropdownListSelectedIdChange,
          }),
          h('.track-editing-modal__content__volume-dropdown__label', [
            'Volume:',
          ]),
          h(DropdownList, {
            className: 'track-editing-modal__content__voice-dropdown__list',
            items: volumeRangeItems,
            selectedId: getOr('', 'props.stagedTrack.volume', this),
            onSelectedIdChange: this.handleContentVolumeDropdownListSelectedIdChange,
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

  handleContentDeleteButtonClick = () => {
    this.props.onDelete(this.props.stagedTrack);
  };

  handleContentVoiceDropdownListSelectedIdChange = voice =>
    this.props.onVoiceSet(
      this.props.stagedTrack,
      voice,
    );

  handleContentVolumeDropdownListSelectedIdChange = volume =>
    this.props.onVolumeSet(
      this.props.stagedTrack,
      volume,
    );
}

export function getVoiceList() {
  return Object.keys(Dawww.VOICES).map(key => ({
    text: Dawww.VOICES[key],
    id: Dawww.VOICES[key],
  }));
}
