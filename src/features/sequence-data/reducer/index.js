import { combineReducers } from 'redux';
import previousToolType from './previous-tool-type';
import toolType from './tool-type';

export default combineReducers({
  previousToolType,
  toolType,
});
