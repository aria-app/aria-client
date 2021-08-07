import { Button, Dialog, FormGroup, Select, Stack } from 'aria-ui';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Dawww } from '../../../dawww';
import { Song } from '../../../types';
import { getDeleteSongUpdater, useDeleteSong } from '../../api';

export interface SongInfoDialogProps {
  isOpen?: boolean;
  onBPMChange: (changedBPM: number) => void;
  onClose: () => void;
  onReturnToDashboard: () => void;
  onSignOut: () => void;
  song?: Song;
}

export const SongInfoDialog: FC<SongInfoDialogProps> = memo((props) => {
  const {
    isOpen,
    onBPMChange,
    onClose,
    onReturnToDashboard,
    onSignOut,
    song,
    ...rest
  } = props;
  const [deleteSong] = useDeleteSong();
  const history = useHistory();
  const { i18n, t } = useTranslation();

  const handleDeleteSong = useCallback(async () => {
    if (!song) return;

    try {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete the song "${song.name}"? This action is permanent.`,
      );

      if (!shouldDelete) return;

      await deleteSong({
        update: getDeleteSongUpdater(),
        variables: { id: song.id },
      });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [deleteSong, history, song]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onClose}
      title={t('Song Info')}
      {...rest}
    >
      <Stack space={4} sx={{ alignItems: 'flex-start' }}>
        <FormGroup label={t('Shareable Link')}>
          <a
            href={`${process.env.PUBLIC_URL}/view-song/${song?.id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {process.env.PUBLIC_URL}/view-song/{song?.id}
          </a>
        </FormGroup>
        <Select
          label={t('BPM')}
          onValueChange={onBPMChange}
          options={Dawww.BPM_RANGE.map((bpmRangeValue) => ({
            label: String(bpmRangeValue),
            value: bpmRangeValue,
          }))}
          sx={{ width: 'auto' }}
          value={song?.bpm}
        />
        <Button onClick={onReturnToDashboard} text={t('Return to Dashboard')} />
        <Button onClick={onSignOut} text={t('Sign Out')} />
        <Select
          label={t('Select Language')}
          onValueChange={(language) => i18n.changeLanguage(language)}
          options={[
            { label: t('English') as string, value: 'en' },
            { label: t('Japanese') as string, value: 'ja' },
          ]}
          sx={{ width: 'auto' }}
          value={i18n.language}
        />
        <Button
          color="error"
          onClick={handleDeleteSong}
          text={t('Delete Song')}
          variant="contained"
        />
      </Stack>
    </Dialog>
  );
});
