import shared from '../../shared';

export function updateSong(song) {
  return new Promise((resolve) => {
    shared.firebase
      .getDB()
      .collection('songs')
      .doc(song.id)
      .update(song)
      .then(resolve);
  });
}
