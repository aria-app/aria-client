import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { Button, FormGroup, Modal, Stack } = shared.components;

const minVolume = -20;
const maxVolume = 0;

TrackEditingModal.propTypes = {
  onDelete: PropTypes.func,
  onDismiss: PropTypes.func,
  onVoiceSet: PropTypes.func,
  onVolumeSet: PropTypes.func,
  stagedTrack: PropTypes.object,
};

function TrackEditingModal(props) {
  const { onDelete, onDismiss, onVoiceSet, onVolumeSet, stagedTrack } = props;

  const handleContentDeleteButtonClick = React.useCallback(() => {
    onDelete(stagedTrack);
  }, [onDelete, stagedTrack]);

  const handleVoiceChange = React.useCallback(
    (e) => {
      onVoiceSet({ track: stagedTrack, voice: e.target.value });
    },
    [onVoiceSet, stagedTrack],
  );

  const handleVolumeChange = React.useCallback(
    (e) => {
      onVolumeSet({ track: stagedTrack, volume: e.target.value });
    },
    [onVolumeSet, stagedTrack],
  );

  return (
    <Translation>
      {(t) => (
        <Modal
          isOpen={!!stagedTrack}
          onClose={onDismiss}
          titleText={t('Edit Track')}
        >
          <Stack space={4} sx={{ alignItems: 'flex-start' }}>
            <FormGroup label="Voice">
              <select
                onChange={handleVoiceChange}
                value={
                  stagedTrack && stagedTrack.voice ? stagedTrack.voice : ''
                }
              >
                {Object.keys(Dawww.VOICES).map((voice) => (
                  <option key={voice} value={voice}>
                    {t(voice)}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup label="Volume">
              <select
                onChange={handleVolumeChange}
                value={
                  stagedTrack && stagedTrack.volume ? stagedTrack.volume : 0
                }
              >
                {range(maxVolume, minVolume - 1).map((volume) => (
                  <option key={volume} value={volume}>
                    {volume}
                  </option>
                ))}
              </select>
            </FormGroup>
            <Button color="error.main" onClick={handleContentDeleteButtonClick}>
              {t('Delete')}
            </Button>
          </Stack>
        </Modal>
      )}
    </Translation>
  );
}

export default TrackEditingModal;
