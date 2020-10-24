import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import Tone from 'tone';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;
const { IconButton, Toolbar } = shared.components;

const styles = (theme) => ({
  root: {
    borderBottom: `2px solid ${theme.palette.divider}`,
    zIndex: 1,
  },
});

// export interface SongViewerToolbarProps extends WithStyles<typeof styles> {
//   onPause?: () => void;
//   onPlay?: () => void;
//   onStop?: () => void;
//   playbackState?: string;
// }

function SongViewerToolbar(props) {
  const { classes, onPause, onPlay, onStop, playbackState } = props;

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

  return (
    <Toolbar
      className={classes.root}
      rightItems={
        <React.Fragment>
          {hideIf(playbackState === STARTED)(
            <IconButton icon="play" onClick={playPause} title="Play" />,
          )}
          {showIf(playbackState === STARTED)(
            <IconButton icon="pause" onClick={playPause} title="Pause" />,
          )}
          {showIf(playbackState !== STOPPED)(
            <IconButton icon="stop" onClick={onStop} title="Stop" />,
          )}
        </React.Fragment>
      }
    />
  );
}

export default React.memo(withStyles(styles)(SongViewerToolbar));
