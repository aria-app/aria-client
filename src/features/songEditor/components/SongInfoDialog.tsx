import { Button, Dialog, FormGroup, Select, Stack } from 'aria-ui';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Dawww } from '../../../dawww';
import { Song } from '../../../types';

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
  const { i18n, t } = useTranslation();

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
            https://ariaapp.io/view-song/{song?.id}
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
            { label: t('Japanese') as string, value: 'jp' },
          ]}
          sx={{ width: 'auto' }}
          value={i18n.language}
        />
      </Stack>
    </Dialog>
  );
});
