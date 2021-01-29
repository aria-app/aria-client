import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import Tone from 'tone';

import Dawww from '../../../dawww';
import audio from '../../audio';
import auth from '../../auth';
import notesEditor from '../../notesEditor';
import shared from '../../shared';
import songFeature from '../../song';
import tracksEditor from '../../tracksEditor';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

const { useAuth } = auth.hooks;
const { useAudioManager, usePlaybackState } = audio.hooks;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { NotesEditor } = notesEditor.components;
const { Box } = shared.components;
const { useSong } = songFeature.hooks;
const { TracksEditor } = tracksEditor.components;

SongEditor.propTypes = {
  navigate: PropTypes.func,
  songId: PropTypes.string,
};

function SongEditor(props) {
  const { navigate, songId } = props;
  const audioManager = useAudioManager();
  const { user } = useAuth();
  const playbackState = usePlaybackState();
  const { loading, song, fetchSongById } = useSong();
  const [isSongInfoModalOpen, setIsSongInfoModalOpen] = React.useState(false);

  const playPause = React.useCallback(
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

  const handleReturnToDashboard = React.useCallback(() => {
    navigate('../../');
  }, [navigate]);

  const handleSongBPMChange = React.useCallback(() => {
    console.log('should update song BPM');
  }, []);

  const handleSongInfoModalConfirm = React.useCallback(() => {
    setIsSongInfoModalOpen(false);
  }, []);

  const handleSongInfoOpen = React.useCallback(() => {
    setIsSongInfoModalOpen(true);
  }, []);

  const handleSignOut = React.useCallback(() => {
    navigate('../../sign-out');
  }, [navigate]);

  React.useEffect(() => {
    if (!song) return;

    window.document.title = `${song.name} - Aria`;
  }, [song]);

  React.useEffect(() => {
    fetchSongById(songId);
  }, [fetchSongById, songId]);

  if (song && song.userId !== user.uid) {
    return (
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        }}
      >
        You do not have permissions to edit this song.
      </Box>
    );
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
      {!loading && (
        <SongInfoModal
          isOpen={isSongInfoModalOpen}
          onBPMChange={handleSongBPMChange}
          onConfirm={handleSongInfoModalConfirm}
          onReturnToDashboard={handleReturnToDashboard}
          onSignOut={handleSignOut}
          song={song}
        />
      )}
    </Box>
  );
}

export default React.memo(SongEditor);
