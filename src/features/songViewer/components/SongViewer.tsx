import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

import Dawww from '../../../dawww';
import api from '../../api';
import audio from '../../audio';
import shared from '../../shared';
import SongViewerToolbar from './SongViewerToolbar';

const { useAudioManager, usePlaybackState, usePosition } = audio.hooks;

const { Box, LoadingIndicator, Slider, Stack, Typography } = shared.components;

SongViewer.propTypes = {
  songId: PropTypes.string,
};

function SongViewer(props: any) {
  const { songId: songIdProp } = props;
  const songId = parseInt(songIdProp);
  const audioManager = useAudioManager();
  const playbackState = usePlaybackState();
  const position = usePosition();
  const { data, loading } = useQuery(api.queries.GET_SONG, {
    variables: { id: songId },
  });
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
    () => (data ? (position / (data.song.bpm * 8)) * 60 : 0),
    [data, position],
  );

  const totalSeconds = React.useMemo(
    () => (data ? (data.song.measureCount / (data.song.bpm / 4)) * 60 : 0),
    [data],
  );

  React.useEffect(() => {
    setPositionState(position);
  }, [position, setPositionState]);

  React.useEffect(() => {
    if (!data) return;

    audioManager.updateSong(data.song);

    window.document.title = `${data.song.name} - Aria`;
  }, [audioManager, data]);

  return (
    <>
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
              <Typography variant="h5">{data && data.song.name}</Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Slider
                  max={data && data.song.measureCount * 32}
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
    </>
  );
}

export default React.memo(SongViewer);
