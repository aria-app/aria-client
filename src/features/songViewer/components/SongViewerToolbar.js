import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import styled from 'styled-components';
import Tone from 'tone';

import Dawww from '../../../dawww';
import shared from '../../shared';

const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;
const { IconButton, Toolbar } = shared.components;

const Root = styled(Toolbar)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  zIndex: 1,
}));

SongViewerToolbar.propTypes = {
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  playbackState: PropTypes.string,
};

function SongViewerToolbar(props) {
  const { onPause, onPlay, onStop, playbackState } = props;

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
    <Root
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

export default React.memo(SongViewerToolbar);
