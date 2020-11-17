import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import Tone from 'tone';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;
const { Box, Column, Columns } = shared.components;

// export interface SongEditorToolbarProps extends WithStyles<typeof styles> {
//   onPause?: () => void;
//   onPlay?: () => void;
//   onSongInfoOpen?: () => void;
//   onStop?: () => void;
//   playbackState?: string;
// }

function SongEditorToolbar(props) {
  const { onPause, onPlay, onSongInfoOpen, onStop, playbackState } = props;

  const playPause = React.useCallback(
    function playPause() {
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
      backgroundColor="paper"
      borderBottomWidth={2}
      borderColor="border"
      padding="xsmall"
    >
      <Columns alignY="center">
        <Column width="content">
          <Box
            borderRadius="medium"
            isInteractionOverlayVisible
            onClick={onSongInfoOpen}
            padding="xsmall"
            style={{ alignItems: 'center', display: 'flex' }}
            title="Settings"
          >
            <SettingsIcon color="action" />
          </Box>
        </Column>
        <Column />
        <Column width="content">
          {hideIf(playbackState === STARTED)(
            <Box
              borderRadius="medium"
              isInteractionOverlayVisible
              onClick={playPause}
              padding="xsmall"
              style={{ alignItems: 'center', display: 'flex' }}
              title="Play"
            >
              <PlayArrowIcon color="action" />
            </Box>,
          )}
          {showIf(playbackState === STARTED)(
            <Box
              borderRadius="medium"
              isInteractionOverlayVisible
              onClick={playPause}
              padding="xsmall"
              style={{ alignItems: 'center', display: 'flex' }}
              title="Pause"
            >
              <PauseIcon color="action" />
            </Box>,
          )}
          {showIf(playbackState !== STOPPED)(
            <Box
              borderRadius="medium"
              isInteractionOverlayVisible
              onClick={onStop}
              padding="xsmall"
              style={{ alignItems: 'center', display: 'flex' }}
              title="Stop"
            >
              <StopIcon color="action" />
            </Box>,
          )}
        </Column>
      </Columns>
    </Box>
  );
}

export default React.memo(SongEditorToolbar);
