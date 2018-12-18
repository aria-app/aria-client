import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { hideIf, showIf } from 'react-render-helpers';
import { Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import sequenceEditor from '../../../sequenceEditor';
import shared from '../../../shared';
import songEditor from '../../../songEditor';

const SongLoadingIndicator = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
`;

const { styles } = shared;
const { Shell } = shared.components;
const { SequenceEditorContainer } = sequenceEditor.components;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { SongEditorContainer } = songEditor.components;

export class App extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isSongLoading: PropTypes.bool,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    stringifiedSong: PropTypes.string.isRequired,
  }

  render() {
    return (
      <ThemeProvider
        theme={styles.themes.emerald}>
        <HotKeys
          focused={true}
          handlers={this.getKeyHandlers()}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}>
          <Shell>
            {showIf(this.props.isSongLoading)(
              <SongLoadingIndicator>
                LOADING...
              </SongLoadingIndicator>
            )}
            {hideIf(this.props.isSongLoading)(
              <React.Fragment>
                <Route
                  component={SongEditorContainer}
                  exact={true}
                  path="/"
                />
                <Route
                  component={SequenceEditorContainer}
                  path="/sequencer/:sequenceId"
                />
              </React.Fragment>
            )}
          </Shell>
        </HotKeys>
      </ThemeProvider>
    );
  }

  getKeyHandlers = () => ({
    enter: this.playPause,
    esc: this.stop,
  });

  playPause = () => {
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
