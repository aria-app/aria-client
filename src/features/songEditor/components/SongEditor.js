import { Router } from '@reach/router';
import audio from 'features/audio';
import auth from 'features/auth';
import notesEditor from 'features/notesEditor';
import shared from 'features/shared';
import tracksEditor from 'features/tracksEditor';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useRecoilValue } from 'recoil';
import Tone from 'tone';

import Dawww from '../../../dawww';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

const { useAuth } = auth.hooks;
const { useAudio } = audio.hooks;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { NotesEditorContainer } = notesEditor.components;
const { Box } = shared.components;
const { TracksEditorContainer } = tracksEditor.components;

SongEditor.propTypes = {
  navigate: PropTypes.func,
  onBPMChange: PropTypes.func,
  song: PropTypes.object,
};

function SongEditor(props) {
  const { navigate, onBPMChange, song } = props;
  const { audioState, audioManager } = useAudio();
  const { user } = useAuth();
  const playbackState = useRecoilValue(audioState.playbackState);

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
    window.document.title = `${song.name} - Aria`;
  }, [song, song.name]);

  if (song.userId && song.userId !== user.uid) {
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
        <TracksEditorContainer path="/" />
        <NotesEditorContainer path="sequence/:sequenceId" />
      </Box>
      <SongInfoModal
        isOpen={isSongInfoModalOpen}
        onBPMChange={onBPMChange}
        onConfirm={handleSongInfoModalConfirm}
        onReturnToDashboard={handleReturnToDashboard}
        onSignOut={handleSignOut}
        song={song}
      />
    </Box>
  );
}

export default React.memo(SongEditor);
