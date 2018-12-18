import isEqual from 'lodash/fp/isEqual';
import throttle from 'lodash/fp/throttle';
import auth from '../features/auth';
import shared from '../features/shared';
import song from '../features/song';

const throttledUpdate = throttle(500, (updatedSong) => {
  song.helpers.updateSong(updatedSong)
    .catch((error) => {
      console.error('Error while updating song: ', error);
    });
});

export default store => next => (action) => {
  const prevSong = song.selectors.getSong(store.getState());
  const nextState = next(action);
  const nextSong = song.selectors.getSong(store.getState());

  if (action.type === shared.actions.SONG_FOCUSED) {
    const user = auth.selectors.getUser(store.getState());

    song.helpers.fetchUserSong(user)
      .then((loadedSong) => {
        store.dispatch(shared.actions.songLoaded(loadedSong));
      })
      .catch((error) => {
        console.error('Error while fetching song: ', error);
      });
  }

  if (action.type === shared.actions.SONG_LOADED) {
    return nextState;
  }

  if (!isEqual(prevSong, nextSong)) {
    throttledUpdate(nextSong);
  }

  return nextState;
};
