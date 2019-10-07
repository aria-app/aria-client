import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';
import * as selectors from '../selectors';

export const loadSong = createLogic({
  type: shared.actions.SONG_LOADED,
  process({ action, getState }, dispatch, done) {
    const focusedSequenceId = selectors.getFocusedSequenceId(getState());

    dawww.updateSong({
      ...action.payload.song,
      focusedSequenceId,
    });

    done();
  },
});
