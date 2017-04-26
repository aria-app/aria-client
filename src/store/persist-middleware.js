import isEqual from 'lodash/fp/isEqual';
import throttle from 'lodash/fp/throttle';
import shared from '../features/shared';
import song from '../features/song';

const throttledSave = throttle(500)((obj) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(obj));
});

export default store => next => (action) => {
  const prevSong = song.selectors.getSong(store.getState());
  const nextState = next(action);
  const nextSong = song.selectors.getSong(store.getState());

  if (!isEqual(prevSong, nextSong)) {
    throttledSave(nextSong);
  }

  return nextState;
};
