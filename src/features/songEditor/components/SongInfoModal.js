import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import map from 'lodash/fp/map';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { changeLanguage } = shared.i18n;
const getBPMRangeItem = (x) => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const ShareableLinkAnchor = styled.a(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(0.5),
}));

const Content = styled(DialogContent)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
}));

const Title = styled(DialogTitle)({
  fontWeight: 800,
  textTransform: 'uppercase',
});

SongInfoModal.propTypes = {
  isOpen: PropTypes.bool,
  onBPMChange: PropTypes.func,
  onConfirm: PropTypes.func,
  onReturnToDashboard: PropTypes.func,
  onSignOut: PropTypes.func,
  song: PropTypes.object,
};

function SongInfoModal(props) {
  const {
    isOpen,
    onBPMChange,
    onConfirm,
    onReturnToDashboard,
    onSignOut,
    song,
  } = props;

  const handleBPMSelectChange = React.useCallback(
    (e) => {
      onBPMChange(e.target.value);
    },
    [onBPMChange],
  );

  return (
    <Translation>
      {(t) => (
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          onClose={onConfirm}
          open={isOpen}
        >
          <Title>{t('Song Info')}</Title>
          <Content>
            <Stack spacing="medium">
              <div>
                <InputLabel>Shareable Link</InputLabel>
                <ShareableLinkAnchor
                  href={`${process.env.PUBLIC_URL}/view-song/${song.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://ariaapp.io/view-song/{song.id}
                </ShareableLinkAnchor>
              </div>
              <FormControl>
                <FormLabel htmlFor="bpm">BPM</FormLabel>
                <Select
                  id="bpm"
                  name="bpm"
                  onChange={handleBPMSelectChange}
                  value={song.bpm}
                >
                  {bpmRangeItems.map((bpmRangeItem) => (
                    <option key={bpmRangeItem.id} value={bpmRangeItem.id}>
                      {bpmRangeItem.text}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={onReturnToDashboard} variant="outline">
                {t('Return to Dashboard')}
              </Button>
              <Button onClick={onSignOut} variant="outline">
                {t('Sign Out')}
              </Button>
              <Text variant="label">{t('Select Language')}</Text>
              <Button onClick={() => changeLanguage('en')} variant="outline">
                {t('English')}
              </Button>
              <Button onClick={() => changeLanguage('jp')} variant="outline">
                {t('Japanese')}
              </Button>
            </Stack>
          </Content>
        </Dialog>
      )}
    </Translation>
  );
}

export default React.memo(SongInfoModal);
