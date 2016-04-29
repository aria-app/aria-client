import { combineReducers } from 'redux';
import sequence from 'sequence';

export default combineReducers({
  [sequence.constants.NAME]: sequence.reducer,
});
