import { Button, Dialog, Select, Stack } from 'aria-ui';
import range from 'lodash/fp/range';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Track, Voice } from '../../../types';
import { useGetVoices } from '../../api';

const minVolume = -20;
const maxVolume = 0;

export type TrackEditingModalTrackChangeHandler = (options: {
  id: number;
  voiceId?: number;
  volume?: number;
}) => void;

export interface TrackEditingModalProps {
  onClose: () => void;
  onDelete: (trackToDelete: Track) => void;
  onTrackChange: TrackEditingModalTrackChangeHandler;
  track?: Track;
}

export const TrackEditingModal: FC<TrackEditingModalProps> = (props) => {
  const { onClose, onDelete, onTrackChange, track } = props;
  const { data, loading } = useGetVoices();
  const [trackState, setTrackState] = useState<Track>();
  const { t } = useTranslation();

  const voices = useMemo<Voice[]>(() => (data ? data.voices.data : []), [data]);

  const handleDeleteButtonClick = useCallback(() => {
    if (!trackState) return;

    onDelete(trackState);
  }, [onDelete, trackState]);

  const handleVoiceChange = useCallback<(value: number) => void>(
    (value) => {
      if (!trackState) return;

      onTrackChange({
        id: trackState.id,
        voiceId: value,
      });
    },
    [onTrackChange, trackState],
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
    <Dialog
      isOpen={!!track}
      onClose={onClose}
      onOverlayClick={onClose}
      title={t('Edit Track')}
    >
      <Stack align="start" space={6}>
        <Select
          disabled={loading}
          label="Voice"
          onValueChange={handleVoiceChange}
          options={voices.map((voice) => ({
            label: t(voice.name) as string,
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
          onClick={handleDeleteButtonClick}
          text={t('Delete')}
          variant="contained"
        />
      </Stack>
    </Dialog>
  );
};
