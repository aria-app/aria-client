import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import './song-toolbar.scss';

const { Button, IconButton, Toolbar } = shared.components;
const { PAUSED, STARTED, STOPPED } = transport.constants.playbackStates;

const component = props => h(Toolbar, {
  className: 'song-toolbar',
  position: 'bottom',
  leftItems: [
    props.playbackButtons,
  ],
  rightItems: [
    h(Button, {
      text: 'clear cache',
      onPress: props.onClearCachePress,
    }),
    h(Button, {
      text: `BPM ${props.BPM}`,
      onPress: props.bpmModalOpened,
    }),
    h('a', {
      href: props.downloadHref,
      download: 'song.json',
    }, ['Download']),
  ],
});

const composed = compose(
  setDisplayName('SongToolbar'),
  pure,
  setPropTypes({
    BPM: React.PropTypes.number.isRequired,
    bpmModalOpened: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    stringifiedSong: React.PropTypes.string.isRequired,
    stop: React.PropTypes.func.isRequired,
  }),
  mapProps(props => ({
    ...props,
    downloadHref: getDownloadHref(props.stringifiedSong),
    playbackButtons: getPlaybackButtons(props),
  })),
  withHandlers({
    onClearCachePress: () => () => {
      window.localStorage.removeItem('currentSong');
      window.location.reload();
    },
  }),
)(component);

export const SongToolbar = composed;

function getDownloadHref(stringifiedSong) {
  const uriComponent = encodeURIComponent(stringifiedSong);
  const data = `text/json;charset=utf-8,${uriComponent}`;
  return `data:${data}`;
}

function getPlaybackButtons(props) {
  return h('.song-toolbar__playback-buttons', [
    h(IconButton, {
      isActive: props.playbackState === STARTED,
      icon: 'play',
      onPress: () => props.play(),
    }),
    h(IconButton, {
      isActive: props.playbackState === PAUSED,
      icon: 'pause',
      onPress: () => props.pause(),
    }),
    h(IconButton, {
      isActive: props.playbackState === STOPPED,
      icon: 'stop',
      onPress: () => props.stop(),
    }),
  ]);
}
