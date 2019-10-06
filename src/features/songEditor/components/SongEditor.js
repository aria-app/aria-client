import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import sequenceEditor from '../../sequenceEditor';
import tracksEditor from '../../tracksEditor';
import SongEditorToolbar from './SongEditorToolbar';
import SongInfoModal from './SongInfoModal';

const { SequenceEditorContainer } = sequenceEditor.components;
const { TracksEditorContainer } = tracksEditor.components;

const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
};

function SongEditor(props) {
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
        component={SequenceEditorContainer}
        exact={true}
        path={`${match.path}/sequencer/:sequenceId`}
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

SongEditor.propTypes = {
  bpm: PropTypes.number,
  classes: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  onBPMChange: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  playbackState: PropTypes.string,
  song: PropTypes.object,
};

export default React.memo(withStyles(styles)(SongEditor));
