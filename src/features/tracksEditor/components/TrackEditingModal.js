import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import isEmpty from 'lodash/fp/isEmpty';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import styled from 'styled-components';

import Dawww from '../../../dawww';

const minVolume = -20;
const maxVolume = 0;

const DeleteButton = styled(Button)(({ theme }) => ({
  alignSelf: 'stretch',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

const Dropdown = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
}));

const Content = styled(DialogContent)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  marginLeft: theme.spacing(-1),
  marginRight: theme.spacing(-1),
}));

const Title = styled(DialogTitle)({
  fontWeight: 800,
  textTransform: 'uppercase',
});

TrackEditingModal.propTypes = {
  onDelete: PropTypes.func,
  onDismiss: PropTypes.func,
  onVoiceSet: PropTypes.func,
  onVolumeSet: PropTypes.func,
  stagedTrack: PropTypes.object,
};

function TrackEditingModal(props) {
  const { onDelete, onDismiss, onVoiceSet, onVolumeSet, stagedTrack } = props;

  const handleContentDeleteButtonClick = React.useCallback(() => {
    onDelete(stagedTrack);
  }, [onDelete, stagedTrack]);

  const handleVoiceChange = React.useCallback(
    (e) => {
      onVoiceSet({ track: stagedTrack, voice: e.target.value });
    },
    [onVoiceSet, stagedTrack],
  );

  const handleVolumeChange = React.useCallback(
    (e) => {
      onVolumeSet({ track: stagedTrack, volume: e.target.value });
    },
    [onVolumeSet, stagedTrack],
  );

  return (
    <Translation>
      {(t) => (
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          onClose={onDismiss}
          open={!isEmpty(stagedTrack)}
        >
          <Title>{t('Edit Track')}</Title>
          <Content>
            <Dropdown>
              <InputLabel htmlFor="voice">Voice</InputLabel>
              <Select
                inputProps={{ name: 'voice', id: 'voice' }}
                onChange={handleVoiceChange}
                value={
                  stagedTrack && stagedTrack.voice ? stagedTrack.voice : ''
                }
              >
                {Object.keys(Dawww.VOICES).map((voice) => (
                  <MenuItem key={voice} value={voice}>
                    {t(voice)}
                  </MenuItem>
                ))}
              </Select>
            </Dropdown>
            <Dropdown>
              <InputLabel htmlFor="volume">Volume</InputLabel>
              <Select
                inputProps={{ name: 'volume', id: 'volume' }}
                onChange={handleVolumeChange}
                value={
                  stagedTrack && stagedTrack.volume ? stagedTrack.volume : 0
                }
              >
                {range(maxVolume, minVolume - 1).map((volume) => (
                  <MenuItem key={volume} value={volume}>
                    {volume}
                  </MenuItem>
                ))}
              </Select>
            </Dropdown>
            <DeleteButton
              color="secondary"
              onClick={handleContentDeleteButtonClick}
              variant="contained"
            >
              {t('Delete')}
            </DeleteButton>
          </Content>
        </Dialog>
      )}
    </Translation>
  );
}

export default React.memo(TrackEditingModal);
