import { connect } from 'react-redux';
import song from '../../../song';
import tracksData from '../../../tracks-data';
import { Ruler } from './ruler';

// TODO: Add appropriate state connections back when available
export const RulerContainer = connect(state => ({
  measureCount: song.selectors.getMeasureCount(state),
  playbackState: 'stopped',
}), {
  onPause: () => {},
  onPlay: () => {},
  onPositionSet: () => {},
  onSongExtend: tracksData.actions.songExtended,
  onSongShorten: tracksData.actions.songShortened,
})(Ruler);
