import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import Tone from 'tone';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;
const { Box, Column, Columns } = shared.components;

function TempIconButton(props) {
  return (
    <Box
      interactive
      sx={{
        alignItems: 'center',
        borderRadius: 1,
        color: 'text.secondary',
        display: 'flex',
        padding: 2,
      }}
      {...props}
    />
  );
}

SongEditorToolbar.propTypes = {
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onSongInfoOpen: PropTypes.func,
  onStop: PropTypes.func,
  playbackState: PropTypes.string,
};

function SongEditorToolbar(props) {
  const { onPause, onPlay, onSongInfoOpen, onStop, playbackState } = props;

  const handlePlayPauseToggle = React.useCallback(
    function handlePlayPauseToggle() {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }

      if (playbackState === STARTED) {
        onPause();
      } else {
        onPlay();
      }
    },
    [onPause, onPlay, playbackState],
  );

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderBottomStyle: 'solid',
        borderColor: 'divider',
        borderWidth: 2,
        padding: 2,
      }}
    >
      <Columns alignY="center" space={4}>
        <Column>
          <TempIconButton onClick={onSongInfoOpen} title="Settings">
            <SettingsIcon />
          </TempIconButton>
        </Column>
        <Column width="content">
          {hideIf(playbackState === STARTED)(
            <TempIconButton onClick={handlePlayPauseToggle} title="Play">
              <PlayArrowIcon />
            </TempIconButton>,
          )}
          {showIf(playbackState === STARTED)(
            <TempIconButton onClick={handlePlayPauseToggle} title="Pause">
              <PauseIcon />
            </TempIconButton>,
          )}
          {showIf(playbackState !== STOPPED)(
            <TempIconButton onClick={onStop} title="Stop">
              <StopIcon />
            </TempIconButton>,
          )}
        </Column>
      </Columns>
    </Box>
  );
}

export default React.memo(SongEditorToolbar);
