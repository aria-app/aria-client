import PropTypes from 'prop-types';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Dawww from '../../../dawww';
import audio from '../../audio';
import shared from '../../shared';
import SongViewerToolbar from './SongViewerToolbar';

const { useAudio } = audio.hooks;

const {
  Box,
  Fade,
  LoadingIndicator,
  Slider,
  Stack,
  Typography,
} = shared.components;

SongViewer.propTypes = {
  isLoading: PropTypes.bool,
  onLoad: PropTypes.func,
  position: PropTypes.number,
  song: PropTypes.object,
  songId: PropTypes.string,
};

function SongViewer(props) {
  const { isLoading, onLoad, song, songId } = props;
  const { audioState, audioManager } = useAudio();
  const playbackState = useRecoilValue(audioState.playbackState);
  const position = useRecoilValue(audioState.position);
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

  const elapsedSeconds = React.useMemo(() => (position / (song.bpm * 8)) * 60, [
    position,
    song.bpm,
  ]);

  const totalSeconds = React.useMemo(
    () => (song.measureCount / (song.bpm / 4)) * 60,
    [song.bpm, song.measureCount],
  );

  React.useEffect(() => {
    setPositionState(position);
  }, [position, song.bpm]);

  React.useEffect(() => {
    onLoad({ songId });
  }, [onLoad, songId]);

  React.useEffect(() => {
    window.document.title = `${song.name} - Aria`;
  }, [song, song.name]);

  return (
    <React.Fragment>
      <Fade in={isLoading}>
        <LoadingIndicator>Loading Song...</LoadingIndicator>
      </Fade>
      <Fade in={!isLoading}>
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
      </Fade>
    </React.Fragment>
  );
}

export default React.memo(SongViewer);
