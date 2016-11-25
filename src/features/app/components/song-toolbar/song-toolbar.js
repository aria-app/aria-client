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
    bpmModalOpened: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    stop: React.PropTypes.func.isRequired,
    stringifiedSong: React.PropTypes.string.isRequired,
  }

  render() {
    return h(Toolbar, {
      className: 'song-toolbar',
      position: 'bottom',
      leftItems: [
        h('.song-toolbar__playback-buttons', [
          h(IconButton, {
            isActive: this.props.playbackState === STARTED,
            icon: 'play',
            onPress: () => this.props.play(),
          }),
          h(IconButton, {
            isActive: this.props.playbackState === PAUSED,
            icon: 'pause',
            onPress: () => this.props.pause(),
          }),
          h(IconButton, {
            isActive: this.props.playbackState === STOPPED,
            icon: 'stop',
            onPress: () => this.props.stop(),
          }),
        ]),
      ],
      rightItems: [
        h(Button, {
          text: 'clear cache',
          onPress: this.handleClearCacheClick,
        }),
        h(Button, {
          text: `BPM ${this.props.BPM}`,
          onPress: this.props.bpmModalOpened,
        }),
        h(DownloadButton, {
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
