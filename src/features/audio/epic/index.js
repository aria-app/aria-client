import { combineEpics } from 'redux-observable';

import loadSongEpic from './loadSongEpic';
import subscribeToPlaybackStateEpic from './subscribeToPlaybackStateEpic';
import updateSongEpic from './updateSongEpic';

export default combineEpics(
  loadSongEpic,
  subscribeToPlaybackStateEpic,
  updateSongEpic,
);
