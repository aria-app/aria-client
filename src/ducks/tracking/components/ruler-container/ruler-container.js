import { connect } from 'react-redux';
import song from 'ducks/song';
import { Ruler } from '../ruler/ruler';

export const RulerContainer = connect((state) => ({
  measureCount: song.selectors.getMeasureCount(state),
}))(Ruler);
