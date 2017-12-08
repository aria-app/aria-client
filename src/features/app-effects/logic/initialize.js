import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import shared from '../../shared';

export const initialize = createLogic({
  type: shared.actions.INITIALIZED,
  process: (_, dispatch, done) => {
    const localStorageSong = localStorage.getItem(
      shared.constants.localStorageKey,
    );

    const initialSong = localStorageSong
      ? JSON.parse(localStorageSong)
      : shared.helpers.createSong();

    dispatch(appData.actions.songLoaded({
      song: initialSong,
    }));

    done();
  },
});
