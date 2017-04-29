import { combineReducers } from 'redux';
import windowHeight from './windowHeight';
import windowWidth from './windowWidth';

export default combineReducers({
  windowHeight,
  windowWidth,
});
