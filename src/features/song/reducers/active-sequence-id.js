import * as actions from '../actions';

export const activeSequenceId = (state = '', action) => {
  switch (action.type) {
    case actions.SONG_LOADED:
      return action.song.activeSequenceId;
    case actions.SEQUENCE_CLOSED:
      return '';
    case actions.SEQUENCE_OPENED:
      return action.id;
    default:
      return state;
  }
};
