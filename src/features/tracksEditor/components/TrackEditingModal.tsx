import find from 'lodash/fp/find';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import { Track } from '../../../types';

import api from '../../api';
import shared from '../../shared';

const { useGetVoices } = api.hooks;
const { Button, FormGroup, Modal, Stack } = shared.components;

const minVolume = -20;
const maxVolume = 0;

TrackEditingModal.propTypes = {
  onDelete: PropTypes.func,
  onDismiss: PropTypes.func,
  onTrackChange: PropTypes.func,
  track: PropTypes.object,
};

function TrackEditingModal(props: any) {
  const { onDelete, onDismiss, onTrackChange, track } = props;
  const { data: voicesData, loading } = useGetVoices();
  const [trackState, setTrackState] = React.useState<Track>();

  const voices = React.useMemo(() => (voicesData ? voicesData.voices : []), [
    voicesData,
  ]);

  const handleContentDeleteButtonClick = React.useCallback(() => {
    onDelete(trackState);
  }, [onDelete, trackState]);

  const handleVoiceChange = React.useCallback(
    (e) => {
      onTrackChange({
        id: trackState?.id,
        voice: find((voice) => voice.id === e.target.value, voices),
      });
    },
    [onTrackChange, trackState, voices],
  );

  const handleVolumeChange = React.useCallback(
    (e) => {
      onTrackChange({ id: trackState?.id, volume: parseInt(e.target.value) });
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
                value={trackState ? trackState.voice.id : ''}
              >
                {loading ? (
                  <option value={undefined}>Loading...</option>
                ) : (
                  voices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {t(voice.name)}
                    </option>
                  ))
                )}
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
