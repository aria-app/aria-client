import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { Route } from 'react-router-dom';
import notesEditor from '../../notesEditor';
import tracksEditor from '../../tracksEditor';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

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
});

interface Song {
  [key: string]: any;
}

export interface SongEditorProps extends WithStyles<typeof styles> {
  bpm?: number;
  history?: { [key: string]: any };
  match?: { [key: string]: any };
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
    history,
    match,
    onBPMChange,
    onPause,
    onPlay,
    onStop,
    playbackState,
    song,
  } = props;
  const [isSongInfoModalOpen, setIsSongInfoModalOpen] = React.useState(false);

  const handleSongInfoModalConfirm = React.useCallback(() => {
    setIsSongInfoModalOpen(false);
  }, []);

  const handleSongInfoOpen = React.useCallback(() => {
    setIsSongInfoModalOpen(true);
  }, []);

  const handleReturnToDashboard = React.useCallback(() => {
    history.push('/');
  }, [history]);

  const handleSignOut = React.useCallback(() => {
    history.push('/sign-out');
  }, [history]);

  React.useEffect(() => {
    window.document.title = `${song.name} - Aria`;
  }, [song.name]);

  return (
    <div className={classes.root}>
      <SongEditorToolbar
        onPause={onPause}
        onPlay={onPlay}
        onSongInfoOpen={handleSongInfoOpen}
        onStop={onStop}
        playbackState={playbackState}
      />
      <Route component={TracksEditorContainer} exact={true} path={match.path} />
      <Route
        component={NotesEditorContainer}
        exact={true}
        path={`${match.path}/sequence/:sequenceId`}
      />
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
