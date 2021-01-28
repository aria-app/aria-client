import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import Tone from 'tone';

import Dawww from '../../../dawww';
import notesEditor from '../../notesEditor';
import shared from '../../shared';
import tracksEditor from '../../tracksEditor';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

const { STARTED } = Dawww.PLAYBACK_STATES;
const { NotesEditorContainer } = notesEditor.components;
const { Box } = shared.components;
const { TracksEditorContainer } = tracksEditor.components;

SongEditor.propTypes = {
  navigate: PropTypes.func,
  onBPMChange: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  playbackState: PropTypes.string,
  song: PropTypes.object,
  user: PropTypes.object,
};

function SongEditor(props) {
  const {
    navigate,
    onBPMChange,
    onPause,
    onPlay,
    onStop,
    playbackState,
    song,
    user,
  } = props;
  const [isSongInfoModalOpen, setIsSongInfoModalOpen] = React.useState(false);

  const playPause = React.useCallback(
    function playPause() {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }

      if (playbackState === STARTED) {
        onPause();
      } else {
        onPlay();
      }
    },
    [onPause, onPlay, playbackState],
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
        handlers={{ PLAY_PAUSE: playPause, STOP: onStop }}
        keyMap={{ PLAY_PAUSE: 'enter', STOP: 'esc' }}
      />
      <SongEditorToolbar
        onPause={onPause}
        onPlay={onPlay}
        onSongInfoOpen={handleSongInfoOpen}
        onStop={onStop}
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
