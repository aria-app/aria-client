import _ from 'lodash';
import createLogger from 'redux-logger';
import playing from '../features/playing';
import sequencingPosition from '../features/sequencing-position';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import transport from '../features/transport';

const typesToSkip = [
  playing.actions.NOTE_PLAYED,
  sequencingPosition.actions.MOUSE_MOVED,
  sequencingPosition.actions.MOUSE_POINT_SET,
  sequencingPosition.actions.SCROLL_LEFT_SET,
  sequencingPosition.actions.SCROLL_TOP_SET,
  sequencingPosition.actions.SCROLLED_HORIZONTALLY,
  sequencingPosition.actions.SCROLLED_VERTICALLY,
  shared.actions.INITIALIZED,
  shortcuts.actions.PAN_HELD,
  shortcuts.actions.PAN_RELEASED,
  transport.actions.PLAYBACK_STARTED,
  transport.actions.PLAYBACK_STOPPED,
  transport.actions.POSITION_SET,
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
