import { combineEpics } from 'redux-observable';

import loadSongEpic from './loadSongEpic';
import pausePlaybackEpic from './pausePlaybackEpic';
import startPlaybackEpic from './startPlaybackEpic';
import stopPlaybackEpic from './stopPlaybackEpic';
import subscribeToPlaybackStateEpic from './subscribeToPlaybackStateEpic';
import updateSongEpic from './updateSongEpic';

export default combineEpics(
  loadSongEpic,
  pausePlaybackEpic,
  startPlaybackEpic,
  stopPlaybackEpic,
  subscribeToPlaybackStateEpic,
  updateSongEpic,
);
