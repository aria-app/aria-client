import { connect } from 'react-redux';
import song from 'ducks/song';
import transport from 'ducks/transport';
import { Ruler } from '../ruler/ruler';

export const RulerContainer = connect((state) => ({
  measureCount: song.selectors.getMeasureCount(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  extendSong: song.actions.extendSong,
  pause: transport.actions.playbackPaused,
  play: transport.actions.playbackStarted,
  setPosition: transport.actions.transportPositionSet,
  shortenSong: song.actions.shortenSong,
})(Ruler);
