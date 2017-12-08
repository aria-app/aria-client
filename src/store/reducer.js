import { combineReducers } from 'redux';
import appData from '../features/app-data';
import audioClientData from '../features/audio-client-data';
import sequenceData from '../features/sequence-data';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracksData from '../features/tracks-data';

export default combineReducers({
  [appData.constants.NAME]: appData.reducer,
  [audioClientData.constants.NAME]: audioClientData.reducer,
  [sequenceData.constants.NAME]: sequenceData.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracksData.constants.NAME]: tracksData.reducer,
});
