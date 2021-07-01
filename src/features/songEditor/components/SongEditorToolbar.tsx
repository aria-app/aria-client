import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import { Box, IconButton, Stack, Toolbar } from 'aria-ui';
import { memo, useCallback } from 'react';
import * as Tone from 'tone';

import Dawww from '../../../dawww';
import { PlaybackState } from '../../../types';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;

export interface SongEditorToolbarProps {
  onPause: () => void;
  onPlay: () => void;
  onSongInfoOpen: () => void;
  onStop: () => void;
  playbackState: PlaybackState;
}

function SongEditorToolbar(props: SongEditorToolbarProps) {
  const { onPause, onPlay, onSongInfoOpen, onStop, playbackState } = props;

  const handlePlayPauseToggle = useCallback(
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
    <Toolbar padding={2}>
      <Stack direction="row" space={2} sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            icon={<SettingsIcon />}
            onClick={onSongInfoOpen}
            title="Settings"
          />
        </Box>
        {playbackState && playbackState !== STARTED && (
          <IconButton
            icon={<PlayArrowIcon />}
            onClick={handlePlayPauseToggle}
            title="Play"
          />
        )}
        {playbackState && playbackState === STARTED && (
          <IconButton
            icon={<PauseIcon />}
            onClick={handlePlayPauseToggle}
            title="Pause"
          />
        )}
        {playbackState && playbackState !== STOPPED && (
          <IconButton icon={<StopIcon />} onClick={onStop} title="Stop" />
        )}
      </Stack>
    </Toolbar>
  );
}

export default memo(SongEditorToolbar);
