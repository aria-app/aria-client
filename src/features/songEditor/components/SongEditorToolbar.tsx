import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import PropTypes from 'prop-types';
import React from 'react';
import Tone from 'tone';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;
const { Box, Button, Stack, Toolbar } = shared.components;

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
    <Toolbar position="top">
      <Stack direction="row" space={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={onSongInfoOpen}
            startIcon={<SettingsIcon />}
            title="Settings"
            variant="text"
          />
        </Box>
        {playbackState && playbackState !== STARTED && (
          <Button
            onClick={handlePlayPauseToggle}
            startIcon={<PlayArrowIcon />}
            title="Play"
            variant="text"
          />
        )}
        {playbackState && playbackState === STARTED && (
          <Button
            onClick={handlePlayPauseToggle}
            startIcon={<PauseIcon />}
            title="Pause"
            variant="text"
          />
        )}
        {playbackState && playbackState !== STOPPED && (
          <Button
            onClick={onStop}
            startIcon={<StopIcon />}
            title="Stop"
            variant="text"
          />
        )}
      </Stack>
    </Toolbar>
  );
}

export default React.memo(SongEditorToolbar);
