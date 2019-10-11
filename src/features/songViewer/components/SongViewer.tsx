import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import SongViewerToolbar from './SongViewerToolbar';

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

export interface SongViewerProps extends WithStyles<typeof styles> {
  onLoad?: (songId: string) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onStop?: () => void;
  playbackState?: string;
  position?: number;
  song?: Song;
  songId?: string;
}

function SongViewer(props: SongViewerProps) {
  const {
    classes,
    onLoad,
    onPause,
    onPlay,
    onStop,
    playbackState,
    position,
    song,
    songId,
  } = props;

  React.useEffect(() => {
    onLoad(songId);
  }, [onLoad, songId]);

  React.useEffect(() => {
    window.document.title = `${song.name} - Aria`;
  }, [song, song.name]);

  return (
    <div className={classes.root}>
      <SongViewerToolbar
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        playbackState={playbackState}
      />
      <div>Name {song.name}</div>
      <div>Position {position}</div>
      <div>Current {Math.ceil((position / (song.bpm * 8)) * 60)}</div>
      <div>Length {Math.ceil((song.measureCount / (song.bpm / 4)) * 60)}</div>
    </div>
  );
}

export default React.memo(withStyles(styles)(SongViewer));
