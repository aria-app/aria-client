import classnames from 'classnames';
import Dawww from 'dawww';
import map from 'lodash/fp/map';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './SongInfoModal.scss';

const { Button, DownloadButton, DropdownList, Modal } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);


export class SongInfoModal extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    measureCount: PropTypes.number.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onMeasureCountChange: PropTypes.func.isRequired,
    stringifiedSong: PropTypes.string.isRequired,
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
          className: 'song-info-modal__bpm-dropdown',
          items: bpmRangeItems,
          selectedId: this.props.bpm,
          onSelectedIdChange: this.handleContentDropdownListSelect,
        }),
        h('.song-info-modal__measure-count-ticker', [
          h('.song-info-modal__measure-count-ticker__minus', {
            className: this.getMeasureCountTickerMinusClassName(),
            onClick: this.handleMeasureCountTickerMinusClick,
          }, ['-']),
          h('.song-info-modal__measure-count-ticker__value', [
            this.props.measureCount,
          ]),
          h('.song-info-modal__measure-count-ticker__plus', {
            onClick: this.handleMeasureCountTickerPlusClick,
          }, ['+']),
        ]),
        h(Button, {
          className: 'song-toolbar__clear-cache-button',
          text: 'clear cache',
          onClick: this.handleClearCacheClick,
        }),
        h(DownloadButton, {
          className: 'song-toolbar__download-song-button',
          content: this.props.stringifiedSong,
          filename: 'song.json',
          text: 'Download Song',
        }),
      ]),
    ]);
  }

  getMeasureCountTickerMinusClassName = () =>
    classnames({
      'song-info-modal__measure-count-ticker__minus--disabled': this.props.measureCount < 2,
    });

  handleClearCacheClick = () => {
    window.localStorage.removeItem('currentSong');
    window.location.reload();
  }

  handleContentDropdownListSelect = (value) => {
    this.props.onBPMChange(value);
  }

  handleMeasureCountTickerMinusClick = () => {
    if (this.props.measureCount < 2) return;

    this.props.onMeasureCountChange(this.props.measureCount - 1);
  };

  handleMeasureCountTickerPlusClick = () => {
    this.props.onMeasureCountChange(this.props.measureCount + 1);
  };
}
