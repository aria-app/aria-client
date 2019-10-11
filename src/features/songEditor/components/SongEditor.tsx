import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { Router } from '@reach/router';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import Tone from 'tone';
import Dawww from '../../../dawww';
import notesEditor from '../../notesEditor';
import tracksEditor from '../../tracksEditor';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

const { STARTED } = Dawww.PLAYBACK_STATES;
const { NotesEditorContainer } = notesEditor.components;
const { TracksEditorContainer } = tracksEditor.components;

const styles = createStyles({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  router: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
});

interface Song {
  [key: string]: any;
}

export interface SongEditorProps extends WithStyles<typeof styles> {
  bpm?: number;
  navigate?: (path: string) => void;
  onBPMChange?: (bpm: number) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onStop?: () => void;
  playbackState?: string;
  song?: Song;
}

function SongEditor(props: SongEditorProps) {
  const {
    bpm,
    classes,
    navigate,
    onBPMChange,
    onPause,
    onPlay,
    onStop,
    playbackState,
    song,
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
  }, [song.name]);

  return (
    <div className={classes.root}>
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
      <Router className={classes.router}>
        <TracksEditorContainer path="/" />
        <NotesEditorContainer path="sequence/:sequenceId" />
      </Router>
      <SongInfoModal
        bpm={bpm}
        isOpen={isSongInfoModalOpen}
        onBPMChange={onBPMChange}
        onConfirm={handleSongInfoModalConfirm}
        onReturnToDashboard={handleReturnToDashboard}
        onSignOut={handleSignOut}
      />
    </div>
  );
}

export default React.memo(withStyles(styles)(SongEditor));
