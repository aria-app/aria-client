import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import sequencer from '../../../sequencer';
import shared from '../../../shared';
import tracker from '../../../tracker';
import { UploadOverlay } from '../UploadOverlay/UploadOverlay';
import { SongToolbar } from '../SongToolbar/SongToolbar';
import { VFXLayer } from '../VFXLayer/VFXLayer';
import './App.scss';

const { SequencerContainer } = sequencer.components;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { TrackerContainer } = tracker.components;

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
      <HotKeys
        className="app"
        focused={true}
        handlers={this.getKeyHandlers()}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}>
        {this.getContentComponent()}
        <SongToolbar
          bpm={this.props.bpm}
          onBPMChange={this.props.onBPMChange}
          onMeasureCountChange={this.props.onMeasureCountChange}
          onPause={this.props.onPause}
          onPlay={this.props.onPlay}
          onStop={this.props.onStop}
          playbackState={this.props.playbackState}
          songMeasureCount={this.props.songMeasureCount}
          stringifiedSong={this.props.stringifiedSong}
        />
        <UploadOverlay
          isFileOver={this.state.isFileOver}
          onCancel={this.handleUploadOverlayCancel}
          onUpload={this.handleUploadOverlayUpload}
        />
        <VFXLayer/>
      </HotKeys>
    );
  }

  getContentComponent = () => {
    if (this.props.locationType === shared.actions.SEQUENCER_LOADED) {
      return <SequencerContainer/>
    }

    return <TrackerContainer/>;
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
    this.props.onUpload({
      song: data,
    });
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
