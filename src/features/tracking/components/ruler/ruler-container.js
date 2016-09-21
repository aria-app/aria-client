import { connect } from 'react-redux';
import song from '../../../song';
import transport from '../../../transport';
import { Ruler } from '../ruler/ruler';
import * as actions from '../../actions';

export const RulerContainer = connect(state => ({
  measureCount: song.selectors.getMeasureCount(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  extendSong: actions.songExtended,
  pause: transport.actions.playbackPaused,
  play: transport.actions.playbackStarted,
  setPosition: transport.actions.transportPositionSet,
  shortenSong: actions.songShortened,
})(Ruler);
