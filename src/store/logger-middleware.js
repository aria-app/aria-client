import _ from 'lodash';
import createLogger from 'redux-logger';
import playing from '../features/playing';
import sequencing from '../features/sequencing';
import shared from '../features/shared';
import transport from '../features/transport';

const typesToSkip = [
  playing.actions.NOTE_PLAYED,
  sequencing.actions.MOUSE_MOVED,
  sequencing.actions.MOUSE_POINT_SET,
  sequencing.actions.SCROLL_LEFT_SET,
  sequencing.actions.SCROLL_TOP_SET,
  sequencing.actions.SCROLLED_HORIZONTALLY,
  sequencing.actions.SCROLLED_VERTICALLY,
  shared.actions.INITIALIZED,
  transport.actions.PLAYBACK_STARTED,
  transport.actions.PLAYBACK_STOPPED,
  transport.actions.SEQUENCE_STEP_TRIGGERED,
  transport.actions.SONG_POSITION_SET,
  transport.actions.SONG_SEQUENCE_STEP,
  transport.actions.SONG_SEQUENCE_STEP_TRIGGERED,
  transport.actions.START_POINT_SET,
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
