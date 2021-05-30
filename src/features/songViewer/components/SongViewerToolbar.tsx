import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { memo, useCallback } from 'react';
import * as Tone from 'tone';

import Dawww from '../../../dawww';
import { PlaybackState } from '../../../types';
import { Button, Stack, Toolbar } from '../../shared';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;

export interface SongViewerToolbarProps {
  onPause: () => void;
  onPlay: () => void;
  onStop: () => void;
  playbackState: PlaybackState;
}

function SongViewerToolbar(props: SongViewerToolbarProps) {
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
    <Toolbar position="top">
      <Stack direction="row" space={2} sx={{ justifyContent: 'flex-end' }}>
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

export default memo(SongViewerToolbar);
