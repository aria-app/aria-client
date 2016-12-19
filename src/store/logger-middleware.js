import { includes } from 'lodash/fp';
import createLogger from 'redux-logger';
import panning from '../features/panning';
import playing from '../features/playing';
import selecting from '../features/selecting';
import sequencingPosition from '../features/sequencing-position';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import transport from '../features/transport';

const typesToSkip = [
  panning.actions.START_POINT_SET,
  panning.actions.STARTED,
  panning.actions.STOPPED,
  panning.actions.UPDATED,
  playing.actions.NOTE_PLAYED,
  selecting.actions.NEW_POINT_SET,
  selecting.actions.UPDATED,
  sequencingPosition.actions.MOUSE_MOVED,
  sequencingPosition.actions.MOUSE_POINT_SET,
  sequencingPosition.actions.SCROLL_LEFT_SET,
  sequencingPosition.actions.SCROLL_TOP_SET,
  sequencingPosition.actions.SCROLLED_HORIZONTALLY,
  sequencingPosition.actions.SCROLLED_VERTICALLY,
  shared.actions.INITIALIZED,
  shared.actions.WINDOW_HEIGHT_CHANGED,
  shared.actions.WINDOW_WIDTH_CHANGED,
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
  !includes(action.type)(typesToSkip);

export default createLogger({
  colors: {},
  collapsed,
  predicate,
});
