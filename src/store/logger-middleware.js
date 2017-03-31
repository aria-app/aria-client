import { includes } from 'lodash/fp';
import createLogger from 'redux-logger';
import playback from '../features/playback';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import transport from '../features/transport';

const typesToSkip = [
  playback.actions.NOTE_PLAYED,
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
