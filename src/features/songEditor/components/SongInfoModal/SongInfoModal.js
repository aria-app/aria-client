import Dawww from 'dawww';
import map from 'lodash/fp/map';
import PropTypes from 'prop-types';
import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
import styled from 'styled-components';
import shared from '../../../shared';

const { Button, DownloadButton, DropdownList, Modal } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const SongInfoModalBPMDropdown = styled(DropdownList)`
  margin-bottom: ${props => props.theme.margin.m}px;
`;

const SongInfoModalContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const SongInfoModalMeasureCountTicker = styled.div`
  align-items: center;
  align-self: flex-start;
  border: 1px solid ${props => props.theme.color};
  border-radius: 4px;
  display: flex;
  height: 48px;
  overflow: hidden;
`;

const SongInfoModalMeasureCountTickerMinus = styled.div`
  border-right: 1px solid ${props => props.theme.color};
  opacity: ${props => props.isDisabled && 0.75};
  padding: ${props => props.theme.margin.m}px;
  pointer-events: ${props => props.isDisabled && 'none'};
`;

const SongInfoModalMeasureCountTickerPlus = styled.div`
  border-left: 1px solid ${props => props.theme.color};
  padding: ${props => props.theme.margin.m}px;
`;

const SongInfoModalMeasureCountTickerValue = styled.div`
  padding: ${props => props.theme.margin.m}px;
`;

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
      <NamespacesConsumer>
        {t => (
          <Modal
            className="song-info-modal"
            isOpen={this.props.isOpen}
            onClickOutside={this.props.onConfirm}
            titleText={t('Song Info')}>
            <SongInfoModalContent
              className="song-info-modal__content">
              <SongInfoModalBPMDropdown
                items={bpmRangeItems}
                selectedId={this.props.bpm}
                onSelectedIdChange={this.handleContentDropdownListSelect}
              />
              <SongInfoModalMeasureCountTicker
                className="song-info-modal__measure-count-ticker">
                <SongInfoModalMeasureCountTickerMinus
                  isDisabled={this.props.measureCount < 2}
                  onClick={this.handleMeasureCountTickerMinusClick}>
                  -
                </SongInfoModalMeasureCountTickerMinus>
                <SongInfoModalMeasureCountTickerValue>
                  {this.props.measureCount}
                </SongInfoModalMeasureCountTickerValue>
                <SongInfoModalMeasureCountTickerPlus
                  onClick={this.handleMeasureCountTickerPlusClick}>
                  +
                </SongInfoModalMeasureCountTickerPlus>
              </SongInfoModalMeasureCountTicker>
              <Button
                onClick={this.handleClearCacheClick}>
                {t('Clear Cache')}
              </Button>
              <DownloadButton
                fileContents={this.getStringifiedSong()}
                filename="song.json">
                {t('Download Song')}
              </DownloadButton>
            </SongInfoModalContent>
            {t('Select Language')}
            <Button
              onClick={() => shared.i18n.changeLanguage('en')}>
              {t('English')}
            </Button>
            <Button
              onClick={() => shared.i18n.changeLanguage('jp')}>
              {t('Japanese')}
            </Button>
          </Modal>
        )}
      </NamespacesConsumer>
    );
  }

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
