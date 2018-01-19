import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const loadSong = createLogic({
  type: shared.actions.SONG_LOADED,
  process({ action }, dispatch, done) {
    dawww.updateSong(action.song);

    done();
  },
});
