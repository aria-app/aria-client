import anime from 'animejs';
import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './SongToolbar.scss';

const { Button, DownloadButton, IconButton, Toolbar } = shared.components;
const { STARTED, STOPPED } = Dawww.PLAYBACK_STATES;

export class SongToolbar extends React.PureComponent {
  static propTypes = {
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
    stringifiedSong: PropTypes.string.isRequired,
  }

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
    return h(Toolbar, {
      className: 'song-toolbar',
      position: 'bottom',
      leftItems: [
        h('.song-toolbar__song-info', [
          h('.song-toolbar__song-info__time', [
            '00:00:05',
          ]),
          h('.song-toolbar__song-info__bpm', [
            `${120} BPM`,
          ]),
        ]),
        h('.song-toolbar__playback-buttons', [
          h(IconButton, {
            className: 'song-toolbar__playback-buttons__stop',
            icon: 'stop',
            onClick: this.handlePlaybackButtonsStopClick,
            getRef: this.setPlaybackButtonsStopRef,
            size: 'small',
            style: {
              display: 'none',
            },
          }),
          h(IconButton, {
            className: 'song-toolbar__playback-buttons__play-pause',
            icon: this.getPlaybackButtonsPlayPauseIcon(),
            onClick: this.handlePlaybackButtonsPlayPauseClick,
            size: 'small',
          }),
        ]),
      ],
      rightItems: [
        h(Button, {
          className: 'song-toolbar__clear-cache-button',
          text: 'clear cache',
          onClick: this.handleClearCacheClick,
        }),
        h(DownloadButton, {
          className: 'song-toolbar__download-song-button',
          content: this.props.stringifiedSong,
          filename: 'song.json',
          text: 'Download Song',
        }),
      ],
    });
  }

  getPlaybackButtonsPlayPauseIcon = () =>
    (this.props.playbackState === STARTED ? 'pause' : 'play');

  handleClearCacheClick = () => {
    window.localStorage.removeItem('currentSong');
    window.location.reload();
  }

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

  setPlaybackButtonsStopRef = (playbackButtonsStopRef) => {
    this.playbackButtonsStopRef = playbackButtonsStopRef;
  };
}
