import { Box, Text } from 'aria-ui';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetSong } from '../../api';
import { useAudioManager, usePlaybackState } from '../../audio';
import { LoadingIndicator } from '../../shared';
import { SongViewerToolbar } from './SongViewerToolbar';

export interface SongViewerParams {
  songId: string;
}

export type SongViewerProps = Record<string, never>;

export const SongViewer: FC<SongViewerProps> = (props) => {
  const { songId: songIdProp } = useParams<SongViewerParams>();
  const songId = songIdProp ? parseInt(songIdProp) : -1;
  const audioManager = useAudioManager();
  const playbackState = usePlaybackState();
  const { data, loading } = useGetSong({
    variables: { id: songId },
  });

  useEffect(() => {
    if (!data) return;

    audioManager.updateSong(data.song);

    window.document.title = `${data.song?.name} - Aria`;
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
            <Text variant="header">{data?.song?.name}</Text>
          </Box>
        </Box>
      )}
    </>
  );
};
