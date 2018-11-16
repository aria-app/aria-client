import classnames from 'classnames';
import Dawww from 'dawww';
import map from 'lodash/fp/map';
import PropTypes from 'prop-types';
import React from 'react';
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
    song: PropTypes.object,
  }

  render() {
    return (
      <Modal
        className={'song-info-modal'}
        confirmText={'done'}
        isOpen={this.props.isOpen}
        onConfirm={this.props.onConfirm}
        titleText={'Song Info'}
        >
        <div
          className="song-info-modal__content">
          <DropdownList
            className="song-info-modal__bpm-dropdown"
            items={bpmRangeItems}
            selectedId={this.props.bpm}
            onSelectedIdChange={this.handleContentDropdownListSelect}
          />
          <div
            className="song-info-modal__measure-count-ticker">
            <div
              className={this.getMeasureCountTickerMinusClassName()}
              onClick={this.handleMeasureCountTickerMinusClick}>
              -
            </div>
            <div
              className="song-info-modal__measure-count-ticker__value">
              {this.props.measureCount}
            </div>
            <div
              className="song-info-modal__measure-count-ticker__plus"
              onClick={this.handleMeasureCountTickerPlusClick}>
              +
            </div>
          </div>
          <Button
            text="clear cache"
            onClick={this.handleClearCacheClick}
          />
          <DownloadButton
            content={this.getStringifiedSong()}
            filename="song.json"
            text="Download Song"
          />
        </div>
      </Modal>
    );
  }

  getMeasureCountTickerMinusClassName = () =>
    classnames('song-info-modal__measure-count-ticker__minus', {
      'song-info-modal__measure-count-ticker__minus--disabled': this.props.measureCount < 2,
    });

  getStringifiedSong = () =>
    JSON.stringify(this.props.song);

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
