import * as actions from '../actions';

export const id = (state = '', action) => {
  switch (action.type) {
    case actions.ID_SET:
      return action.id;
    case actions.SONG_LOADED:
      return action.song.id;
    default:
      return state;
  }
};
