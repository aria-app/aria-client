import anime from 'animejs';
import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import shared from '../../../shared';
import { SongInfoModal } from '../SongInfoModal/SongInfoModal';
import './SongToolbar.scss';

const { IconButton, Toolbar } = shared.components;
const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;

export class SongToolbar extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number,
    onBPMChange: PropTypes.func.isRequired,
    onMeasureCountChange: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    stringifiedSong: PropTypes.string.isRequired,
  }

  state = {
    isSongInfoModalOpen: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.playbackState === STOPPED && this.props.playbackState !== STOPPED) {
      this.playbackButtonsStopRef.style.display = 'flex';

      anime({
        duration: 100,
        easing: 'easeOutQuad',
        targets: this.playbackButtonsStopRef,
        translateY: -33,
      });
    }

    if (prevProps.playbackState !== STOPPED && this.props.playbackState === STOPPED) {
      anime({
        complete: () => {
          setTimeout(() => {
            this.playbackButtonsStopRef.style.display = 'none';
          }, 200);
        },
        duration: 100,
        easing: 'easeInQuad',
        targets: this.playbackButtonsStopRef,
        translateY: 0,
      });
    }
  }

  render() {
    return (
      <Toolbar
        className="song-toolbar"
        position="bottom"
        leftItems={
          <React.Fragment>
            <SongInfoModal
              bpm={this.props.bpm}
              isOpen={this.state.isSongInfoModalOpen}
              measureCount={this.props.songMeasureCount}
              onBPMChange={this.props.onBPMChange}
              onConfirm={this.handleSongInfoModalConfirm}
              onMeasureCountChange={this.props.onMeasureCountChange}
              stringifiedSong={this.props.stringifiedSong}
            />
            <div
              className="song-toolbar__song-info"
              onClick={this.handleSongInfoClick}>
              <div
                className="song-toolbar__song-info__time">
                00:00:05
              </div>
              <div
                className="song-toolbar__song-info__bpm">
                {this.props.bpm} BPM
              </div>
            </div>
            <div
              className="song-toolbar__playback-buttons">
              <IconButton
                className="song-toolbar__playback-buttons__stop"
                icon="stop"
                onClick={this.handlePlaybackButtonsStopClick}
                getRef={this.setPlaybackButtonsStopRef}
                size="small"
                style={{
                  display: 'none',
                }}
              />
              <IconButton
                className="song-toolbar__playback-buttons__play-pause"
                icon={this.getPlaybackButtonsPlayPauseIcon()}
                onClick={this.handlePlaybackButtonsPlayPauseClick}
                size="small"
              />
            </div>
          </React.Fragment>
        }
      />
    );
  }

  getPlaybackButtonsPlayPauseIcon = () =>
    (this.props.playbackState === STARTED ? 'pause' : 'play');

  handlePlaybackButtonsPlayPauseClick = () => {
    if (this.props.playbackState === STARTED) {
      this.props.onPause();
      return;
    }

    this.props.onPlay();
  };

  handlePlaybackButtonsStopClick = () => {
    this.props.onStop();
  };

  handleSongInfoClick = () => {
    this.setState({
      isSongInfoModalOpen: true,
    });
  };

  handleSongInfoModalConfirm = () => {
    this.setState({
      isSongInfoModalOpen: false,
    });
  }

  setPlaybackButtonsStopRef = (playbackButtonsStopRef) => {
    this.playbackButtonsStopRef = playbackButtonsStopRef;
  };
}
