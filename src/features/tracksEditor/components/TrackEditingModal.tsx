import { Button, Dialog, Select, Stack } from 'aria-ui';
import find from 'lodash/fp/find';
import range from 'lodash/fp/range';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Track, Voice } from '../../../types';
import { useGetVoices } from '../../api';

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
  const { t } = useTranslation();

  const voices = useMemo(
    () => (voicesData ? voicesData.voices : []),
    [voicesData],
  );

  const handleContentDeleteButtonClick = useCallback(() => {
    if (!trackState) return;

    onDelete(trackState);
  }, [onDelete, trackState]);

  const handleVoiceChange = useCallback<(value: number) => void>(
    (value) => {
      if (!trackState) return;

      onTrackChange({
        id: trackState.id,
        voice: find((voice) => voice.id === value, voices),
      });
    },
    [onTrackChange, trackState, voices],
  );

  const handleVolumeChange = useCallback<(value: number) => void>(
    (value) => {
      if (!trackState) return;

      onTrackChange({ id: trackState.id, volume: value });
    },
    [onTrackChange, trackState],
  );

  useEffect(() => {
    if (track) {
      setTrackState(track);
    }
  }, [track]);

  return (
    <Dialog isOpen={!!track} onOverlayClick={onDismiss} title={t('Edit Track')}>
      <Stack align="start" space={6}>
        <Select
          disabled={loading}
          label="Voice"
          onValueChange={handleVoiceChange}
          options={voices.map((voice) => ({
            label: t(voice.name),
            value: voice.id,
          }))}
          placeholder={loading ? 'Loading...' : undefined}
          sx={{ width: 'auto' }}
          value={trackState?.voice?.id}
        />
        <Select
          label="Volume"
          onValueChange={handleVolumeChange}
          options={range(maxVolume, minVolume - 1).map((volume) => ({
            label: String(volume),
            value: volume,
          }))}
          sx={{ width: 'auto' }}
          value={trackState?.volume || 0}
        />
        <Button
          color="error"
          onClick={handleContentDeleteButtonClick}
          text={t('Delete')}
          variant="contained"
        />
      </Stack>
    </Dialog>
  );
}

export default memo(TrackEditingModal);
