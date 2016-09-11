import _ from 'lodash';
import createLogger from 'redux-logger';
import app from './ducks/app';
import playing from './ducks/playing';
import sequencing from './ducks/sequencing';
import shortcuts from './ducks/shortcuts';
import song from './ducks/song';
import transport from './ducks/transport';

const typesToSkip = [
  app.actionTypes.INITIALIZED,
  playing.actionTypes.NOTE_PLAYED,
  sequencing.actionTypes.MOUSE_MOVED,
  sequencing.actionTypes.MOUSE_POINT_SET,
  sequencing.actionTypes.SCROLL_TOP_SET,
  sequencing.actionTypes.SCROLLED_HORIZONTALLY,
  sequencing.actionTypes.SCROLLED_VERTICALLY,
  shortcuts.actionTypes.INITIALIZED,
  song.actionTypes.SONG_LOADED,
  // transport.actionTypes.SEQUENCE_STEP_TRIGGERED,
  transport.actionTypes.SONG_POSITION_SET,
  transport.actionTypes.SONG_SEQUENCE_STEP,
  transport.actionTypes.SONG_SEQUENCE_STEP_TRIGGERED,
  undefined,
];

const collapsed = () => true;
const predicate = (getState, action) =>
  !_.includes(typesToSkip, action.type);

export const loggerMiddleware = createLogger({
  colors: {},
  collapsed,
  predicate,
});
