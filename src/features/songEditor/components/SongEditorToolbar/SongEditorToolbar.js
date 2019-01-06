import Dawww from 'dawww';
import isEmpty from 'lodash/fp/isEmpty';
import negate from 'lodash/fp/negate';
import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import styled from 'styled-components/macro';
import Tone from 'tone';
import shared from '../../../shared';

const { STARTED } = Dawww.PLAYBACK_STATES;
const { IconButton, Toolbar } = shared.components;
const { SYNC_STATES } = shared.constants;

const SyncIndicator = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export class SongEditorToolbar extends React.PureComponent {
  static propTypes = {
    isRedoEnabled: PropTypes.bool.isRequired,
    isUndoEnabled: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRedo: PropTypes.func,
    onSequenceDelete: PropTypes.func,
    onSequenceDuplicate: PropTypes.func,
    onSequenceExtend: PropTypes.func,
    onSequenceMoveLeft: PropTypes.func,
    onSequenceMoveRight: PropTypes.func,
    onSequenceOpen: PropTypes.func,
    onSequenceShorten: PropTypes.func,
    onSongInfoOpen: PropTypes.func,
    onStop: PropTypes.func.isRequired,
    onUndo: PropTypes.func,
    playbackState: PropTypes.string.isRequired,
    selectedSequence: PropTypes.object,
    syncState: PropTypes.oneOf(Object.values(SYNC_STATES)),
  }

  static defaultProps = {
    selectedSequence: {},
  };

  render() {
    return (
      <Toolbar
        position="top"
        isAlternate={this.getIsAlternate()}
        alternateLeftItems={<React.Fragment>
          <IconButton
            icon="cog"
            onClick={this.props.onSongInfoOpen}
            title="Settings"
          />
          <SyncIndicator>
            {this.props.syncState}
          </SyncIndicator>
        </React.Fragment>}
        alternateRightItems={<React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!this.props.isUndoEnabled}
            onClick={this.props.onUndo}
            title="Undo"
          />
          <IconButton
            icon="redo"
            isDisabled={!this.props.isRedoEnabled}
            onClick={this.props.onRedo}
            title="Redo"
          />
          <IconButton
            icon="pencil"
            onClick={this.openSequence}
          />
          <IconButton
            icon="clone"
            onClick={this.props.onSequenceDuplicate}
          />
          <IconButton
            icon="trash"
            onClick={this.props.onSequenceDelete}
          />
          <IconButton
            icon="arrow-left"
            isDisabled={this.getIsMoveLeftButtonDisabled()}
            onClick={this.props.onSequenceMoveLeft}
          />
          <IconButton
            icon="arrow-right"
            onClick={this.props.onSequenceMoveRight}
          />
          <IconButton
            icon="long-arrow-left"
            isDisabled={this.getIsShortenButtonDisabled()}
            onClick={this.props.onSequenceShorten}
          />
          <IconButton
            icon="long-arrow-right"
            onClick={this.props.onSequenceExtend}
          />
        </React.Fragment>}
        leftItems={<React.Fragment>
          <IconButton
            icon="cog"
            onClick={this.props.onSongInfoOpen}
            title="Settings"
          />
          <SyncIndicator>
            {this.props.syncState}
          </SyncIndicator>
        </React.Fragment>}
        rightItems={<React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!this.props.isUndoEnabled}
            onClick={this.props.onUndo}
            title="Undo"
          />
          <IconButton
            icon="redo"
            isDisabled={!this.props.isRedoEnabled}
            onClick={this.props.onRedo}
            title="Redo"
          />
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
        </React.Fragment>}
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
