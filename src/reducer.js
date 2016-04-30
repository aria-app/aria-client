import { combineReducers } from 'redux';
import app from 'modules/app';
import sequence from 'modules/sequence';
import sound from 'modules/sound';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [sequence.constants.NAME]: sequence.reducer,
  [sound.constants.NAME]: sound.reducer,
});
