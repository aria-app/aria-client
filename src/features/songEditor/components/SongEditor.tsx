import { useQuery } from '@apollo/client';
import { Redirect, RouteComponentProps, Router } from '@reach/router';
import { Box } from 'aria-ui';
import { FC, useCallback, useEffect, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import * as Tone from 'tone';

import { Dawww } from '../../../dawww';
import { GET_SONG, GetSongResponse, useUpdateSong } from '../../api';
import { useAudioManager, usePlaybackState } from '../../audio';
import { useAuth } from '../../auth';
import { NotesEditor } from '../../notesEditor';
import { TracksEditor } from '../../tracksEditor';
import { SongEditorToolbar } from './SongEditorToolbar';
import { SongInfoDialog } from './SongInfoDialog';

const { STARTED } = Dawww.PLAYBACK_STATES;

export const SongEditor: FC<RouteComponentProps<{ songId: string }>> = (
  props,
) => {
  const { navigate, songId: songIdProp } = props;
  const songId = songIdProp ? parseInt(songIdProp) : -1;
  const audioManager = useAudioManager();
  const { user } = useAuth();
  const playbackState = usePlaybackState();
  const [updateSong] = useUpdateSong();
  const { data, error, loading } = useQuery<GetSongResponse>(GET_SONG, {
    variables: { id: songId },
  });
  const [isSongInfoModalOpen, setIsSongInfoModalOpen] = useState(false);

  const playPause = useCallback(
    function playPause() {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }

      if (playbackState === STARTED) {
        audioManager.pause();
      } else {
        audioManager.start();
      }
    },
    [audioManager, playbackState],
  );

  const handleReturnToDashboard = useCallback(() => {
    navigate?.('../../');
  }, [navigate]);

  const handleSongBPMChange = useCallback(
    (bpm) => {
      if (!data?.song) return;

      updateSong({
        input: {
          id: data.song.id,
          bpm,
        },
      });
    },
    [data, updateSong],
  );

  const handleSongInfoModalClose = useCallback(() => {
    setIsSongInfoModalOpen(false);
  }, []);

  const handleSongInfoOpen = useCallback(() => {
    setIsSongInfoModalOpen(true);
  }, []);

  const handleSignOut = useCallback(() => {
    navigate?.('../../sign-out');
  }, [navigate]);

  useEffect(() => {
    if (!data) return;

    window.document.title = `${data?.song?.name} - Aria`;
    audioManager.updateSong(data?.song);
  }, [audioManager, data]);

  if (data && user && data.song?.user.id !== user.id) {
    return <Redirect noThrow to={`/view-song/${data.song?.id}`} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      }}
    >
      <GlobalHotKeys
        allowChanges={true}
        handlers={{ PLAY_PAUSE: playPause, STOP: audioManager.stop }}
        keyMap={{ PLAY_PAUSE: 'enter', STOP: 'esc' }}
      />
      <SongEditorToolbar
        onPause={audioManager.pause}
        onPlay={audioManager.start}
        onSongInfoOpen={handleSongInfoOpen}
        onStop={audioManager.stop}
        playbackState={playbackState}
      />
      <Box
        as={Router}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <TracksEditor path="/" />
        <NotesEditor path="sequence/:sequenceId" />
      </Box>
      {!loading && !error && (
        <SongInfoDialog
          isOpen={isSongInfoModalOpen}
          onBPMChange={handleSongBPMChange}
          onClose={handleSongInfoModalClose}
          onReturnToDashboard={handleReturnToDashboard}
          onSignOut={handleSignOut}
          song={data?.song || undefined}
        />
      )}
    </Box>
  );
};
