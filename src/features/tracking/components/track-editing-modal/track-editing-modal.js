import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './track-editing-modal.scss';

const { Button, DropdownList, Modal } = shared.components;
const { synthTypes } = shared.constants;

export class TrackEditingModal extends React.Component {
  static propTypes = {
    delete: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    setSynthType: React.PropTypes.func.isRequired,
    stagedTrack: React.PropTypes.object.isRequired,
  }

  render() {
    return h(Modal, {
      className: 'track-editing-modal',
      confirmText: 'DONE',
      isOpen: !_.isEmpty(this.props.stagedTrack),
      onConfirm: this.props.dismiss,
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
            selectedId: this.props.stagedTrack ? this.props.stagedTrack.synthType : '',
            onSelectedItemChange: this.handleContentSynthDropdownListSelectedItemChange,
          }),
        ]),
        h(Button, {
          className: 'track-editing-modal__content__delete-button',
          onClick: this.handleContentDeleteButtonClick,
          text: 'Delete',
        }),
      ]),
    ]);
  }

  handleContentDeleteButtonClick = () => {
    this.props.delete([this.props.stagedTrack.id]);
  }

  handleContentSynthDropdownListSelectedItemChange = (item) => {
    this.props.setSynthType(this.props.stagedTrack.id, item.id);
  }
}

function getSynthTypeList() {
  return Object.keys(synthTypes).map(key => ({
    text: synthTypes[key],
    id: synthTypes[key],
  }));
}
