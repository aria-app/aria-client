import { combineReducers } from 'redux';
import app from 'modules/app';
import sequence from 'modules/sequence';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [sequence.constants.NAME]: sequence.reducer,
});
