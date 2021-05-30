import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Dawww from '../../../dawww';
import { Song } from '../../../types';
import shared from '../../shared';

const { Button, FormGroup, Modal, Stack } = shared.components;

export interface SongInfoModalProps {
  isOpen: boolean;
  onBPMChange: (changedBPM: number) => void;
  onConfirm: () => void;
  onReturnToDashboard: () => void;
  onSignOut: () => void;
  song?: Song;
}

function SongInfoModal(props: SongInfoModalProps) {
  const {
    isOpen,
    onBPMChange,
    onConfirm,
    onReturnToDashboard,
    onSignOut,
    song,
  } = props;
  const { i18n, t } = useTranslation();

  const handleBPMSelectChange = useCallback(
    (e) => {
      onBPMChange(parseInt(e.target.value));
    },
    [onBPMChange],
  );

  return (
    <Modal onClose={onConfirm} open={isOpen} titleText={t('Song Info')}>
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
        <FormGroup label={t('BPM')}>
          <select onChange={handleBPMSelectChange} value={song?.bpm}>
            {Dawww.BPM_RANGE.map((bpmRangeValue) => (
              <option key={bpmRangeValue} value={bpmRangeValue}>
                {bpmRangeValue}
              </option>
            ))}
          </select>
        </FormGroup>
        <Button onClick={onReturnToDashboard} variant="outlined">
          {t('Return to Dashboard')}
        </Button>
        <Button onClick={onSignOut} variant="outlined">
          {t('Sign Out')}
        </Button>
        <FormGroup label={t('Select Language')} space={4}>
          <Button onClick={() => i18n.changeLanguage('en')} variant="outlined">
            {t('English')}
          </Button>
          <Button onClick={() => i18n.changeLanguage('jp')} variant="outlined">
            {t('Japanese')}
          </Button>
        </FormGroup>
      </Stack>
    </Modal>
  );
}

export default memo(SongInfoModal);
