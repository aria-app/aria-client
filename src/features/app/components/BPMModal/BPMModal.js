import Dawww from 'dawww';
import map from 'lodash/fp/map';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './BPMModal.scss';

const { DropdownList, Modal } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);


export class BPMModal extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
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
