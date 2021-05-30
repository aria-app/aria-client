import { useQuery } from '@apollo/client';
import { Redirect, RouteComponentProps, Router } from '@reach/router';
import { memo, useCallback, useEffect, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import * as Tone from 'tone';

import Dawww from '../../../dawww';
import api from '../../api';
import { GetSongResponse } from '../../api/queries/GET_SONG';
import audio from '../../audio';
import auth from '../../auth';
import notesEditor from '../../notesEditor';
import shared from '../../shared';
import tracksEditor from '../../tracksEditor';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

const { useUpdateSong } = api.hooks;
const { GET_SONG } = api.queries;
const { useAuth } = auth.hooks;
const { useAudioManager, usePlaybackState } = audio.hooks;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { NotesEditor } = notesEditor.components;
const { Box } = shared.components;
const { TracksEditor } = tracksEditor.components;

function SongEditor(props: RouteComponentProps<{ songId: string }>) {
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

  const handleSongInfoModalConfirm = useCallback(() => {
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
        component={Router}
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
        <SongInfoModal
          isOpen={isSongInfoModalOpen}
          onBPMChange={handleSongBPMChange}
          onConfirm={handleSongInfoModalConfirm}
          onReturnToDashboard={handleReturnToDashboard}
          onSignOut={handleSignOut}
          song={data?.song || undefined}
        />
      )}
    </Box>
  );
}

export default memo(SongEditor);
