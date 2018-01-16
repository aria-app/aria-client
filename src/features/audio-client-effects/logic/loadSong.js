import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import dawww from '../dawww';

export const loadSong = createLogic({
  type: appData.actions.SONG_LOADED,
  process({ action }, dispatch, done) {
    dawww.updateSong(action.song);

    done();
  },
});
