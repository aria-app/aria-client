import { connect } from 'react-redux';
import song from '../../../song';
import transport from '../../../transport';
import { Ruler } from '../ruler/ruler';
import * as actions from '../../actions';

// wallaby-ignore
export const RulerContainer = connect(state => ({
  measureCount: song.selectors.getMeasureCount(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  onPause: transport.actions.playbackPaused,
  onPlay: transport.actions.playbackStarted,
  onPositionSet: transport.actions.transportPositionSet,
  onSongExtend: actions.songExtended,
  onSongShorten: actions.songShortened,
})(Ruler);
