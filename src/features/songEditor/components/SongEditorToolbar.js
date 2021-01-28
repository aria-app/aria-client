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
const { Box, Button, Column, Columns } = shared.components;

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
          <Button
            onClick={onSongInfoOpen}
            startIcon={<SettingsIcon />}
            title="Settings"
            variant="text"
          />
        </Column>
        {playbackState && (
          <Column width="content">
            {playbackState !== STARTED && (
              <Button
                onClick={handlePlayPauseToggle}
                startIcon={<PlayArrowIcon />}
                title="Play"
                variant="text"
              />
            )}
            {playbackState === STARTED && (
              <Button
                onClick={handlePlayPauseToggle}
                startIcon={<PauseIcon />}
                title="Pause"
                variant="text"
              />
            )}
            {playbackState !== STOPPED && (
              <Button
                onClick={onStop}
                startIcon={<StopIcon />}
                title="Stop"
                variant="text"
              />
            )}
          </Column>
        )}
      </Columns>
    </Box>
  );
}

export default React.memo(SongEditorToolbar);
