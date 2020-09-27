import { combineEpics } from 'redux-observable';

import loadSongEpic from './loadSongEpic';
import pausePlaybackEpic from './pausePlaybackEpic';
import setPositionEpic from './setPositionEpic';
import startPlaybackEpic from './startPlaybackEpic';
import stopPlaybackEpic from './stopPlaybackEpic';
import subscribeToPlaybackStateEpic from './subscribeToPlaybackStateEpic';
import subscribeToPositionEpic from './subscribeToPositionEpic';
import updateSongEpic from './updateSongEpic';

export default combineEpics(
  loadSongEpic,
  pausePlaybackEpic,
  setPositionEpic,
  startPlaybackEpic,
  stopPlaybackEpic,
  subscribeToPlaybackStateEpic,
  subscribeToPositionEpic,
  updateSongEpic,
);
