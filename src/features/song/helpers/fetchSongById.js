import shared from '../../shared';

const { db } = shared.constants;

export const fetchSongById = (id) =>
  db
    .collection('songs')
    .doc(id)
    .get()
    .then((doc) => doc.data());
