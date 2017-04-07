import { connect } from 'react-redux';
import song from '../../../song';
import { Ruler } from '../ruler/ruler';
import * as actions from '../../actions';

// TODO: Add appropriate state connections back when available
export const RulerContainer = connect(state => ({
  measureCount: song.selectors.getMeasureCount(state),
  playbackState: 'stopped',
}), {
  onPause: () => {},
  onPlay: () => {},
  onPositionSet: () => {},
  onSongExtend: actions.songExtended,
  onSongShorten: actions.songShortened,
})(Ruler);
