import shared from '../../shared';

export function fetchSongById(songId) {
  return shared.firebase
    .getDB()
    .collection('songs')
    .doc(songId)
    .get()
    .then((doc) => doc.data());
}
