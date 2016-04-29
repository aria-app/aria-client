import { combineReducers } from 'redux';
import app from 'app';
import sequence from 'sequence';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [sequence.constants.NAME]: sequence.reducer,
});
