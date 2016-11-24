import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './bpm-modal.scss';

const { DropdownList, Modal } = shared.components;
const { maxBPM, minBPM } = shared.constants;
const bpmRange = _.range(minBPM, maxBPM + 1, 10).map(n => ({
  id: n,
  text: String(n),
}));

export class BPMModal extends React.PureComponent {
  static propTypes = {
    BPM: React.PropTypes.number.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    onBPMSet: React.PropTypes.func.isRequired,
    onConfirm: React.PropTypes.func.isRequired,
  }

  render() {
    return h(Modal, {
      className: 'bpm-modal',
      confirmText: 'DONE',
      isOpen: this.props.isOpen,
      onConfirm: this.props.onConfirm,
      titleText: 'Set BPM',
    }, [
      h('.bpm-modal__content', [
        h(DropdownList, {
          className: 'bpm-modal__content__dropdown-list',
          items: bpmRange,
          selectedId: this.props.BPM,
          onSelectedIdChange: this.handleContentDropdownListSelect,
        }),
      ]),
    ]);
  }

  handleContentDropdownListSelect = (value) => {
    this.props.onBPMSet(value);
  }
}
