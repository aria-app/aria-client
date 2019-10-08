import { createLogic, Logic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';
import * as selectors from '../selectors';

interface Song {
  [key: string]: any;
}

interface Payload {
  song?: Song;
}

interface Action {
  type?: string;
  payload?: Payload;
}

interface Dependencies {
  action?: Action;
  [key: string]: any;
}

type LogicType = Logic<any, Payload, any, Dependencies, any, string>;

export const loadSong: LogicType = createLogic({
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
