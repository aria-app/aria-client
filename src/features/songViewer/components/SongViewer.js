import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import Dawww from '../../../dawww';
import shared from '../../shared';
import SongViewerToolbar from './SongViewerToolbar';

const { Box, Fade, LoadingIndicator, Slider, Typography } = shared.components;

const SliderWrapper = styled.div({
  alignItems: 'center',
  display: 'flex',
});

const StyledSlider = styled(Slider)({
  flex: '1 1 auto',
  width: 'auto',
});

const Time = styled.div(({ theme }) => ({
  flex: '0 0 auto',
  paddingLeft: 6,
}));

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
    position,
    song,
    songId,
  } = props;
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
            <Typography variant="h5">{song.name}</Typography>
            <SliderWrapper>
              <StyledSlider
                max={song.measureCount * 32}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                onMouseDown={handleMouseDown}
                value={positionState}
              />
              <Time>
                {Math.ceil(elapsedSeconds)} / {totalSeconds}
              </Time>
            </SliderWrapper>
          </Box>
        </Box>
      </Fade>
    </React.Fragment>
  );
}

export default React.memo(SongViewer);
