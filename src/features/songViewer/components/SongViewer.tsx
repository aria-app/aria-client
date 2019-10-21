import Fade from '@material-ui/core/Fade';
import Slider from '@material-ui/core/Slider';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import Dawww from '../../../dawww';
import shared from '../../shared';
import { Song } from '../../shared/types';
import SongViewerToolbar from './SongViewerToolbar';

const { LoadingIndicator } = shared.components;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    },
    content: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    name: {
      ...theme.typography.h5,
      marginBottom: theme.spacing(3),
    },
    sliderWrapper: {
      alignItems: 'center',
      display: 'flex',
    },
    slider: {
      flex: '1 1 auto',
      width: 'auto',
    },
    time: {
      paddingLeft: theme.spacing(3),
    },
  });

export interface SongViewerProps extends WithStyles<typeof styles> {
  isLoading?: boolean;
  onLoad?: (payload: { songId: string }) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onPositionSet?: (position: number) => void;
  onStop?: () => void;
  playbackState?: string;
  position?: number;
  song?: Song;
  songId?: string;
}

function SongViewer(props: SongViewerProps) {
  const {
    classes,
    isLoading,
    onLoad,
    onPause,
    onPlay,
    onPositionSet,
    onStop,
    playbackState,
    position,
    song,
    songId,
  } = props;
  const [prevPlaybackState, setPrevPlaybackState] = React.useState(
    playbackState,
  );
  const [positionState, setPositionState] = React.useState(position);

  const handleChange = React.useCallback((e, value) => {
    setPositionState(value);
  }, []);

  const handleChangeCommitted = React.useCallback(() => {
    onPositionSet(positionState);

    if (prevPlaybackState === Dawww.PLAYBACK_STATES.STARTED) {
      onPlay();
    }
  }, [onPlay, onPositionSet, positionState, prevPlaybackState]);

  const handleMouseDown = React.useCallback(() => {
    setPrevPlaybackState(playbackState);
    onPause();
  }, [onPause, playbackState]);

  const elapsedSeconds = React.useMemo(() => (position / (song.bpm * 8)) * 60, [
    position,
    song.bpm,
  ]);

  const totalSeconds = React.useMemo(
    () => (song.measureCount / (song.bpm / 4)) * 60,
    [song.bpm, song.measureCount],
  );

  React.useEffect(() => {
    setPositionState(position);
  }, [position, song.bpm]);

  React.useEffect(() => {
    onLoad({ songId });
  }, [onLoad, songId]);

  React.useEffect(() => {
    window.document.title = `${song.name} - Aria`;
  }, [song, song.name]);

  return (
    <React.Fragment>
      <Fade in={isLoading} mountOnEnter unmountOnExit>
        <LoadingIndicator>Loading Song...</LoadingIndicator>
      </Fade>
      <Fade in={!isLoading} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <SongViewerToolbar
            onPause={onPause}
            onPlay={onPlay}
            onStop={onStop}
            playbackState={playbackState}
          />
          <div className={classes.content}>
            <div className={classes.name}>{song.name}</div>
            <div className={classes.sliderWrapper}>
              <Slider
                className={classes.slider}
                max={song.measureCount * 32}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                onMouseDown={handleMouseDown}
                value={positionState}
              />
              <div className={classes.time}>
                {Math.ceil(elapsedSeconds)} / {totalSeconds}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </React.Fragment>
  );
}

export default React.memo(withStyles(styles)(SongViewer));
