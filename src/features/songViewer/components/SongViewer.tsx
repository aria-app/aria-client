import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Dawww from '../../../dawww';
import api from '../../api';
import audio from '../../audio';
import shared from '../../shared';
import SongViewerToolbar from './SongViewerToolbar';

const { useAudioManager, usePlaybackState, usePosition } = audio.hooks;

const { Box, LoadingIndicator, Slider, Stack, Typography } = shared.components;

function SongViewer(props: RouteComponentProps<{ songId: string }>) {
  const { songId: songIdProp } = props;
  const songId = songIdProp ? parseInt(songIdProp) : -1;
  const audioManager = useAudioManager();
  const playbackState = usePlaybackState();
  const position = usePosition();
  const { data, loading } = useQuery(api.queries.GET_SONG, {
    variables: { id: songId },
  });
  const [prevPlaybackState, setPrevPlaybackState] = useState(playbackState);
  const [positionState, setPositionState] = useState(position);

  const handleChange = useCallback((e, value) => {
    setPositionState(value);
  }, []);

  const handleChangeCommitted = useCallback(() => {
    audioManager.setPosition(positionState);

    if (prevPlaybackState === Dawww.PLAYBACK_STATES.STARTED) {
      audioManager.start();
    }
  }, [audioManager, positionState, prevPlaybackState]);

  const handleMouseDown = useCallback(() => {
    setPrevPlaybackState(playbackState);
    audioManager.pause();
  }, [audioManager, playbackState]);

  const elapsedSeconds = useMemo(
    () => (data ? (position / (data.song.bpm * 8)) * 60 : 0),
    [data, position],
  );

  const totalSeconds = useMemo(
    () => (data ? (data.song.measureCount / (data.song.bpm / 4)) * 60 : 0),
    [data],
  );

  useEffect(() => {
    setPositionState(position);
  }, [position, setPositionState]);

  useEffect(() => {
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

export default memo(SongViewer);
