import * as actions from '../actions';

export const name = (state = '', action) => {
  switch (action.type) {
    case actions.NAME_SET:
      return action.name;
    case actions.SONG_LOADED:
      return action.song.name;
    default:
      return state;
  }
};
