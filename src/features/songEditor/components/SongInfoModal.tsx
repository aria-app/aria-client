import { memo, useCallback } from 'react';
import { Translation } from 'react-i18next';

import Dawww from '../../../dawww';
import { Song } from '../../../types';
import shared from '../../shared';

const { Button, FormGroup, Modal, Stack } = shared.components;
const { changeLanguage } = shared.i18n;

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

  const handleBPMSelectChange = useCallback(
    (e) => {
      onBPMChange(parseInt(e.target.value));
    },
    [onBPMChange],
  );

  return (
    <Translation>
      {(t) => (
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
              <Button onClick={() => changeLanguage('en')} variant="outlined">
                {t('English')}
              </Button>
              <Button onClick={() => changeLanguage('jp')} variant="outlined">
                {t('Japanese')}
              </Button>
            </FormGroup>
          </Stack>
        </Modal>
      )}
    </Translation>
  );
}

export default memo(SongInfoModal);
