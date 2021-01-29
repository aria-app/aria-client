import PropTypes from 'prop-types';
import React from 'react';

import Dawww from '../../../dawww';
import audio from '../../audio';
import shared from '../../shared';
import songFeature from '../../song';
import SongViewerToolbar from './SongViewerToolbar';

const { useAudioManager, usePlaybackState, usePosition } = audio.hooks;
const { useSong } = songFeature.hooks;

const { Box, LoadingIndicator, Slider, Stack, Typography } = shared.components;

SongViewer.propTypes = {
  songId: PropTypes.string,
};

function SongViewer(props) {
  const { songId } = props;
  const audioManager = useAudioManager();
  const playbackState = usePlaybackState();
  const position = usePosition();
  const { getSong, loading, song } = useSong();
  const [prevPlaybackState, setPrevPlaybackState] = React.useState(
    playbackState,
  );
  const [positionState, setPositionState] = React.useState(position);

  const handleChange = React.useCallback((e, value) => {
    setPositionState(value);
  }, []);

  const handleChangeCommitted = React.useCallback(() => {
    audioManager.setPosition(positionState);

    if (prevPlaybackState === Dawww.PLAYBACK_STATES.STARTED) {
      audioManager.start();
    }
  }, [audioManager, positionState, prevPlaybackState]);

  const handleMouseDown = React.useCallback(() => {
    setPrevPlaybackState(playbackState);
    audioManager.pause();
  }, [audioManager, playbackState]);

  const elapsedSeconds = React.useMemo(
    () => (song ? (position / (song.bpm * 8)) * 60 : 0),
    [position, song],
  );

  const totalSeconds = React.useMemo(
    () => (song ? (song.measureCount / (song.bpm / 4)) * 60 : 0),
    [song],
  );

  React.useEffect(() => {
    setPositionState(position);
  }, [position, setPositionState]);

  React.useEffect(() => {
    getSong(songId);
  }, [getSong, songId]);

  React.useEffect(() => {
    if (!song) return;

    audioManager.updateSong(song);

    window.document.title = `${song.name} - Aria`;
  }, [audioManager, song]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingIndicator>Loading Song...</LoadingIndicator>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <SongViewerToolbar
            onPause={audioManager.pause}
            onPlay={audioManager.start}
            onStop={audioManager.stop}
            playbackState={playbackState}
          />
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              padding: 4,
            }}
          >
            <Stack space={4}>
              <Typography variant="h5">{song.name}</Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Slider
                  max={song.measureCount * 32}
                  onChange={handleChange}
                  onChangeCommitted={handleChangeCommitted}
                  onMouseDown={handleMouseDown}
                  sx={{
                    flex: '1 1 auto',
                    width: 'auto',
                  }}
                  value={positionState}
                />
                <Box
                  sx={{
                    flex: '0 0 auto',
                    paddingLeft: 1.5,
                  }}
                >
                  {Math.ceil(elapsedSeconds)} / {totalSeconds}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
}

export default React.memo(SongViewer);
