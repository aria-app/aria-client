import { IconButton, Stack, Toolbar } from 'aria-ui';
import PauseIcon from 'mdi-react/PauseIcon';
import PlayArrowIcon from 'mdi-react/PlayArrowIcon';
import StopIcon from 'mdi-react/StopIcon';
import { FC, memo, useCallback } from 'react';
import * as Tone from 'tone';

import { Dawww } from '../../../dawww';
import { PlaybackState } from '../../../types';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;

export interface SongViewerToolbarProps {
  onPause: () => void;
  onPlay: () => void;
  onStop: () => void;
  playbackState: PlaybackState;
}

export const SongViewerToolbar: FC<SongViewerToolbarProps> = memo((props) => {
  const { onPause, onPlay, onStop, playbackState } = props;

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
      <Stack direction="row" space={2} sx={{ justifyContent: 'flex-end' }}>
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
});
