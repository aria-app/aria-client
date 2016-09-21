import _ from 'lodash';
import createLogger from 'redux-logger';
import playing from '../features/playing';
import sequencing from '../features/sequencing';
import shared from '../features/shared';
import transport from '../features/transport';

const typesToSkip = [
  playing.actionTypes.NOTE_PLAYED,
  sequencing.actionTypes.MOUSE_MOVED,
  sequencing.actionTypes.MOUSE_POINT_SET,
  sequencing.actionTypes.SCROLL_TOP_SET,
  sequencing.actionTypes.SCROLLED_HORIZONTALLY,
  sequencing.actionTypes.SCROLLED_VERTICALLY,
  shared.actionTypes.INITIALIZED,
  transport.actionTypes.PLAYBACK_STARTED,
  transport.actionTypes.PLAYBACK_STOPPED,
  transport.actionTypes.SEQUENCE_STEP_TRIGGERED,
  transport.actionTypes.SONG_POSITION_SET,
  transport.actionTypes.SONG_SEQUENCE_STEP,
  transport.actionTypes.SONG_SEQUENCE_STEP_TRIGGERED,
  transport.actionTypes.START_POINT_SET,
  undefined,
];

const collapsed = () => true;
const predicate = (getState, action) =>
  !_.includes(typesToSkip, action.type);

export default createLogger({
  colors: {},
  collapsed,
  predicate,
});
