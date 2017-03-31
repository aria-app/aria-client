import * as actions from '../actions';

export const measureCount = (state = 1, action) => {
  switch (action.type) {
    case actions.MEASURE_COUNT_SET:
      return action.measureCount;
    case actions.SONG_EXTENDED:
      return state + 1;
    case actions.SONG_LOADED:
      return action.song.measureCount;
    case actions.SONG_SHORTENED:
      return state > 1 ? state - 1 : state;
    default:
      return state;
  }
};
