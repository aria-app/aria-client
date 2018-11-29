import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
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
    return (
      <NamespacesConsumer>
        {t => (
          <Modal
            className="track-editing-modal"
            isOpen={this.getIsOpen()}
            onClickOutside={this.props.onDismiss}
            titleText={t('Edit Track')}
            >
            <div
              className="track-editing-modal__content">
              <div
                className="track-editing-modal__content__voice-dropdown">
                <div
                  className="track-editing-modal__content__voice-dropdown__label">
                  {t('Voice')}
                </div>
                <DropdownList
                  className="track-editing-modal__content__voice-dropdown__list"
                  items={getVoiceList(t)}
                  selectedId={getOr('', 'props.stagedTrack.voice', this)}
                  onSelectedIdChange={this.handleContentVoiceDropdownListSelectedIdChange}
                />
                <div
                  className="track-editing-modal__content__volume-dropdown__label">
                  {t('Volume')}
                </div>
                <DropdownList
                  className="track-editing-modal__content__volume-dropdown__list"
                  items={volumeRangeItems}
                  selectedId={getOr('', 'props.stagedTrack.volume', this)}
                  onSelectedIdChange={this.handleContentVolumeDropdownListSelectedIdChange}
                />
              </div>
              <Button
                className="track-editing-modal__content__delete-button"
                onClick={this.handleContentDeleteButtonClick}>
                {t('Delete')}
              </Button>
            </div>
          </Modal>
        )}
      </NamespacesConsumer>
    );
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

export function getVoiceList(t) {
  return Object.keys(Dawww.VOICES).map(key => ({
    text: t(Dawww.VOICES[key]),
    id: Dawww.VOICES[key],
  }));
}
