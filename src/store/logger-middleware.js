import { includes } from 'lodash/fp';
import createLogger from 'redux-logger';
import playback from '../features/playback';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import transport from '../features/transport';

const typesToSkip = [
  playback.actions.NOTE_PLAYED,
  playback.actions.CHANNELS_SET,
  shared.actions.INITIALIZED,
  shared.actions.WINDOW_HEIGHT_CHANGED,
  shared.actions.WINDOW_WIDTH_CHANGED,
  shortcuts.actions.PAN_HELD,
  shortcuts.actions.PAN_RELEASED,
  shortcuts.actions.PLAYBACK_STOP,
  shortcuts.actions.PLAYBACK_TOGGLE,
  song.actions.SONG_LOADED,
  transport.actions.PLAYBACK_STARTED,
  transport.actions.PLAYBACK_STOPPED,
  transport.actions.POSITION_SET,
  transport.actions.SEQUENCE_STEP_TRIGGERED,
  transport.actions.SEQUENCES_SET,
  transport.actions.SEQUENCES_UPDATED,
  transport.actions.SONG_POSITION_SET,
  transport.actions.SONG_SEQUENCE_STEP_TRIGGERED,
  transport.actions.SONG_SEQUENCE_SET,
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
