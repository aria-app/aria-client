import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
  marginBottom: theme.spacing(6),
  marginTop: theme.spacing(1),
}));

const BpmDropdown = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const Content = styled(DialogContent)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  paddingBottom: theme.spacing(4),
}));

const Title = styled(DialogTitle)({
  fontWeight: 800,
  textTransform: 'uppercase',
});

const SelectLanguageTitle = styled(InputLabel)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

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
            <InputLabel>Shareable Link</InputLabel>
            <ShareableLinkAnchor
              href={`${process.env.PUBLIC_URL}/view-song/${song.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              https://ariaapp.io/view-song/{song.id}
            </ShareableLinkAnchor>
            <BpmDropdown>
              <InputLabel htmlFor="bpm">BPM</InputLabel>
              <Select
                inputProps={{ name: 'bpm', id: 'bpm' }}
                onChange={handleBPMSelectChange}
                value={song.bpm}
              >
                {bpmRangeItems.map((bpmRangeItem) => (
                  <MenuItem key={bpmRangeItem.id} value={bpmRangeItem.id}>
                    {bpmRangeItem.text}
                  </MenuItem>
                ))}
              </Select>
            </BpmDropdown>
            <StyledButton onClick={onReturnToDashboard} variant="outlined">
              {t('Return to Dashboard')}
            </StyledButton>
            <StyledButton onClick={onSignOut} variant="outlined">
              {t('Sign Out')}
            </StyledButton>
            <SelectLanguageTitle>{t('Select Language')}</SelectLanguageTitle>
            <StyledButton
              onClick={() => changeLanguage('en')}
              variant="outlined"
            >
              {t('English')}
            </StyledButton>
            <StyledButton
              onClick={() => changeLanguage('jp')}
              variant="outlined"
            >
              {t('Japanese')}
            </StyledButton>
          </Content>
        </Dialog>
      )}
    </Translation>
  );
}

export default React.memo(SongInfoModal);
