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
  onTrackChange: PropTypes.func,
  track: PropTypes.object,
};

function TrackEditingModal(props) {
  const { onDelete, onDismiss, onTrackChange, track } = props;
  const [trackState, setTrackState] = React.useState();

  const handleContentDeleteButtonClick = React.useCallback(() => {
    onDelete(trackState);
  }, [onDelete, trackState]);

  const handleVoiceChange = React.useCallback(
    (e) => {
      onTrackChange({ ...trackState, voice: e.target.value });
    },
    [onTrackChange, trackState],
  );

  const handleVolumeChange = React.useCallback(
    (e) => {
      onTrackChange({ ...trackState, volume: e.target.value });
    },
    [onTrackChange, trackState],
  );

  React.useEffect(() => {
    if (track) {
      setTrackState(track);
    }
  }, [track]);

  return (
    <Translation>
      {(t) => (
        <Modal isOpen={!!track} onClose={onDismiss} titleText={t('Edit Track')}>
          <Stack space={4} sx={{ alignItems: 'flex-start' }}>
            <FormGroup label="Voice">
              <select
                onChange={handleVoiceChange}
                value={trackState ? trackState.voice.toneOscillatorType : ''}
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
                value={trackState && trackState.volume ? trackState.volume : 0}
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

export default React.memo(TrackEditingModal);
