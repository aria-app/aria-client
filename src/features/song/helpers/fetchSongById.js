import shared from '../../shared';

export function fetchSongById(songId) {
  return shared.firebase
    .getDB()
    .collection('songs')
    .doc(songId)
    .get()
    .then((doc) => {
      const song = doc.data();

      if (!song) {
        throw new Error('Song not found');
      }

      return song;
    });
}
