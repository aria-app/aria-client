import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { ThemeProvider } from 'styled-components';
import sequenceEditor from '../../../sequenceEditor';
import shared from '../../../shared';
import songEditor from '../../../songEditor';

const { actions, styles } = shared;
const { Shell, UploadOverlay } = shared.components;
const { SequenceEditorContainer } = sequenceEditor.components;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { SongEditorContainer } = songEditor.components;

export class App extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    locationType: PropTypes.string.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onMeasureCountChange: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    stringifiedSong: PropTypes.string.isRequired,
  }

  state = {
    isSongInfoModalOpen: false,
    isFileOver: false,
  };

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
            {this.getContentComponent()}
            <UploadOverlay
              isFileOver={this.state.isFileOver}
              onCancel={this.handleUploadOverlayCancel}
              onUpload={this.handleUploadOverlayUpload}
            />
          </Shell>
        </HotKeys>
      </ThemeProvider>
    );
  }

  getContentComponent = () => {
    if (this.props.locationType === actions.SEQUENCER_LOADED) {
      return <SequenceEditorContainer/>
    }

    return <SongEditorContainer/>;
  };

  getKeyHandlers = () => ({
    enter: this.playPause,
    esc: this.stop,
  });

  handleDragEnter = (e) => {
    this.setState({
      isFileOver: true,
    });
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleUploadOverlayCancel = () => {
    this.setState({
      isFileOver: false,
    });
  }

  handleUploadOverlayUpload = (data) => {
    this.props.onUpload(data);

    this.setState({
      isFileOver: false,
    });
  }

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
