import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";
import { HotKeys } from "react-hotkeys";
import styled from "styled-components/macro";
import sequenceEditor from "../../../sequenceEditor";
import tracksEditor from "../../../tracksEditor";
import { SongEditorToolbar } from "../SongEditorToolbar/SongEditorToolbar";
import { SongInfoModal } from "../SongInfoModal/SongInfoModal";

const { SequenceEditorContainer } = sequenceEditor.components;
const { TracksEditorContainer } = tracksEditor.components;

const StyledSongEditor = styled(HotKeys)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export class SongEditor extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    song: PropTypes.object
  };

  state = {
    isSongInfoModalOpen: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps.song.name !== this.props.song.name) {
      window.document.title = `${this.props.song.name} - Zen Sequencer`;
    }
  }

  render() {
    return (
      <StyledSongEditor focused={true} handlers={{}}>
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
          onSongInfoOpen={this.openSongInfo}
          onStop={this.props.onStop}
          playbackState={this.props.playbackState}
        />
        <SongInfoModal
          bpm={this.props.bpm}
          isOpen={this.state.isSongInfoModalOpen}
          onBPMChange={this.props.onBPMChange}
          onConfirm={this.closeSongInfo}
          onReturnToDashboard={this.returnToDashboard}
          onSignOut={this.signOut}
          song={this.props.song}
        />
      </StyledSongEditor>
    );
  }

  closeSongInfo = () => {
    this.setState({
      isSongInfoModalOpen: false
    });
  };

  openSongInfo = () => {
    this.setState({
      isSongInfoModalOpen: true
    });
  };

  returnToDashboard = () => {
    this.props.history.push("/");
  };

  signOut = () => {
    this.props.history.push("/sign-out");
  };
}
