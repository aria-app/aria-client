import Dawww from 'dawww';
import isEmpty from 'lodash/fp/isEmpty';
import negate from 'lodash/fp/negate';
import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import Tone from 'tone';
import shared from '../../../shared';

const { STARTED } = Dawww.PLAYBACK_STATES;
const { IconButton, Toolbar } = shared.components;

export class SongEditorToolbar extends React.PureComponent {
  static propTypes = {
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Toolbar
        position="top"
        isAlternate={this.getIsAlternate()}
        rightItems={
          <React.Fragment>
            {hideIf(this.props.playbackState === STARTED)(
              <IconButton
                icon="play"
                onClick={this.playPause}
                title="Play"
              />
            )}
            {showIf(this.props.playbackState === STARTED)(
              <IconButton
                icon="pause"
                onClick={this.playPause}
                title="Pause"
              />
            )}
            <IconButton
              icon="stop"
              onClick={this.stop}
              title="Stop"
            />
          </React.Fragment>
        }
      />
    );
  }

  getIsAlternate = () =>
    negate(isEmpty)(this.props.selectedSequence);

  getIsMoveLeftButtonDisabled = () =>
    this.props.selectedSequence.position < 1;

  getIsShortenButtonDisabled = () =>
    this.props.selectedSequence.measureCount < 2;

  openSequence = () => {
    this.props.onSequenceOpen(this.props.selectedSequence);
  };

  playPause = () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }

    if (this.props.playbackState === STARTED) {
      this.props.onPause();
    } else {
      this.props.onPlay();
    }
  }

  stop = () => {
    this.props.onStop();
  }
}
