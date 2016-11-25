import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import transport from '../../../transport';
import './song-toolbar.scss';

const { Button, DownloadButton, IconButton, Toolbar } = shared.components;
const { PAUSED, STARTED, STOPPED } = transport.constants.playbackStates;

export class SongToolbar extends React.Component {
  static propTypes = {
    BPM: React.PropTypes.number.isRequired,
    onBPMModalOpen: React.PropTypes.func.isRequired,
    onPause: React.PropTypes.func.isRequired,
    onPlay: React.PropTypes.func.isRequired,
    onStop: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    stringifiedSong: React.PropTypes.string.isRequired,
  }

  render() {
    return h(Toolbar, {
      className: 'song-toolbar',
      position: 'bottom',
      leftItems: [
        h('.song-toolbar__playback-buttons', [
          h(IconButton, {
            className: 'song-toolbar__playback-buttons__play-button',
            isActive: this.props.playbackState === STARTED,
            icon: 'play',
            onClick: this.props.onPlay,
          }),
          h(IconButton, {
            className: 'song-toolbar__playback-buttons__pause-button',
            isActive: this.props.playbackState === PAUSED,
            icon: 'pause',
            onClick: this.props.onPause,
          }),
          h(IconButton, {
            className: 'song-toolbar__playback-buttons__stop-button',
            isActive: this.props.playbackState === STOPPED,
            icon: 'stop',
            onClick: this.props.onStop,
          }),
        ]),
      ],
      rightItems: [
        h(Button, {
          className: 'song-toolbar__clear-cache-button',
          text: 'clear cache',
          onClick: this.handleClearCacheClick,
        }),
        h(Button, {
          className: 'song-toolbar__set-bpm-button',
          text: `BPM ${this.props.BPM}`,
          onClick: this.props.onBPMModalOpen,
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

  handleClearCacheClick = () => {
    window.localStorage.removeItem('currentSong');
    window.location.reload();
  }
}
