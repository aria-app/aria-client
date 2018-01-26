import Dawww from 'dawww';
import map from 'lodash/fp/map';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';

const { DropdownList, Modal } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);


export class SongInfoModal extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  render() {
    return h(Modal, {
      className: 'song-info-modal',
      confirmText: 'done',
      isOpen: this.props.isOpen,
      onConfirm: this.props.onConfirm,
      titleText: 'Song Info',
    }, [
      h('.song-info-modal__content', [
        h(DropdownList, {
          className: 'song-info-modal__content__dropdown-list',
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
