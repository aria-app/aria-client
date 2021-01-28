import PropTypes from 'prop-types';
import React from 'react';
import { useRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import audio from '../../audio';
import shared from '../../shared';
import SongViewerToolbar from './SongViewerToolbar';

const { useDawww } = audio.hooks;

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
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPositionSet: PropTypes.func,
  onStop: PropTypes.func,
  playbackState: PropTypes.string,
  position: PropTypes.number,
  song: PropTypes.object,
  songId: PropTypes.string,
};

function SongViewer(props) {
  const {
    isLoading,
    onLoad,
    onPause,
    onPlay,
    onPositionSet,
    onStop,
    playbackState,
    song,
    songId,
  } = props;
  const { atoms, initializeDawwwInstance } = useDawww();
  const [position] = useRecoilState(atoms.position);
  const [prevPlaybackState, setPrevPlaybackState] = React.useState(
    playbackState,
  );
  const [positionState, setPositionState] = React.useState(position);

  const handleChange = React.useCallback((e, value) => {
    setPositionState(value);
  }, []);

  const handleChangeCommitted = React.useCallback(() => {
    onPositionSet(positionState);

    if (prevPlaybackState === Dawww.PLAYBACK_STATES.STARTED) {
      onPlay();
    }
  }, [onPlay, onPositionSet, positionState, prevPlaybackState]);

  const handleMouseDown = React.useCallback(() => {
    setPrevPlaybackState(playbackState);
    onPause();
  }, [onPause, playbackState]);

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
    initializeDawwwInstance();
    window.document.title = `${song.name} - Aria`;
  }, [initializeDawwwInstance, song, song.name]);

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
            onPause={onPause}
            onPlay={onPlay}
            onStop={onStop}
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
