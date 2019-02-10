import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';
import styled from 'styled-components/macro';
import sequenceEditor from '../../../sequenceEditor';
import tracksEditor from '../../../tracksEditor';
import { SongEditorToolbar } from '../SongEditorToolbar/SongEditorToolbar';

const { SequenceEditorContainer } = sequenceEditor.components;
const { TracksEditorContainer } = tracksEditor.components;

const StyledSongEditor = styled(HotKeys)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  position: relative;
`;

export class SongEditor extends React.PureComponent {
  static propTypes = {
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
  }

  render() {
    return (
      <StyledSongEditor
        focused={true}
        handlers={{}}>
        <Route
          component={TracksEditorContainer}
          exact={true}
          path={this.props.match.path}
        />
        <Route
          component={SequenceEditorContainer}
          exact={true}
          path={`${this.props.match.path}/sequencer/:sequenceId`}
        />
        <SongEditorToolbar
          onPause={this.props.onPause}
          onPlay={this.props.onPlay}
          onStop={this.props.onStop}
          playbackState={this.props.playbackState}
        />
      </StyledSongEditor>
    );
  }
}
