import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './bpm-modal.scss';

const { DropdownList, Modal } = shared.components;
const { bpmRange } = shared.constants;
const bpmRangeItems = getBPMRangeItems();

export class BPMModal extends React.PureComponent {
  static propTypes = {
    bpm: React.PropTypes.number.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    onBPMChange: React.PropTypes.func.isRequired,
    onConfirm: React.PropTypes.func.isRequired,
  }

  render() {
    return h(Modal, {
      className: 'bpm-modal',
      confirmText: 'done',
      isOpen: this.props.isOpen,
      onConfirm: this.props.onConfirm,
      titleText: 'Set BPM',
    }, [
      h('.bpm-modal__content', [
        h(DropdownList, {
          className: 'bpm-modal__content__dropdown-list',
          items: bpmRangeItems,
          selectedId: this.props.bpm,
          onSelectedIdChange: this.handleContentDropdownListSelect,
        }),
      ]),
    ]);
  }

  handleContentDropdownListSelect = (value) => {
    this.props.onBPMChange(value);
  }
}

export function getBPMRangeItems() {
  return bpmRange.map(n => ({
    id: n,
    text: String(n),
  }));
}
