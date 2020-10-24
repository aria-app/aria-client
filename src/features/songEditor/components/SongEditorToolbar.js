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

// export interface SongEditorToolbarProps extends WithStyles<typeof styles> {
//   onPause?: () => void;
//   onPlay?: () => void;
//   onSongInfoOpen?: () => void;
//   onStop?: () => void;
//   playbackState?: string;
// }

function SongEditorToolbar(props) {
  const {
    classes,
    onPause,
    onPlay,
    onSongInfoOpen,
    onStop,
    playbackState,
  } = props;

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
      leftItems={
        <React.Fragment>
          <IconButton icon="cog" onClick={onSongInfoOpen} title="Settings" />
        </React.Fragment>
      }
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

export default React.memo(withStyles(styles)(SongEditorToolbar));
