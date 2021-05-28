import find from 'lodash/fp/find';
import range from 'lodash/fp/range';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Translation } from 'react-i18next';

import { Track, Voice } from '../../../types';
import { useGetVoices } from '../../api';
import shared from '../../shared';

const { Button, FormGroup, Modal, Stack } = shared.components;

const minVolume = -20;
const maxVolume = 0;

export interface TrackEditingModalProps {
  onDelete: (trackToDelete: Track) => void;
  onDismiss: () => void;
  onTrackChange: (options: {
    id: number;
    voice?: Voice;
    volume?: number;
  }) => void;
  track?: Track;
}

function TrackEditingModal(props: TrackEditingModalProps) {
  const { onDelete, onDismiss, onTrackChange, track } = props;
  const { data: voicesData, loading } = useGetVoices();
  const [trackState, setTrackState] = useState<Track>();

  const voices = useMemo(() => (voicesData ? voicesData.voices : []), [
    voicesData,
  ]);

  const handleContentDeleteButtonClick = useCallback(() => {
    if (!trackState) return;

    onDelete(trackState);
  }, [onDelete, trackState]);

  const handleVoiceChange = useCallback(
    (e) => {
      if (!trackState) return;

      onTrackChange({
        id: trackState.id,
        voice: find((voice) => voice.id === e.target.value, voices),
      });
    },
    [onTrackChange, trackState, voices],
  );

  const handleVolumeChange = useCallback(
    (e) => {
      if (!trackState) return;

      onTrackChange({ id: trackState.id, volume: parseInt(e.target.value) });
    },
    [onTrackChange, trackState],
  );

  useEffect(() => {
    if (track) {
      setTrackState(track);
    }
  }, [track]);

  return (
    <Translation>
      {(t) => (
        <Modal onClose={onDismiss} open={!!track} titleText={t('Edit Track')}>
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

export default memo(TrackEditingModal);
