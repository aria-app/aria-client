import shared from '../../shared';

const { db } = shared.constants;

export const updateSong = (song) =>
  new Promise((resolve) => {
    db.collection('songs').doc(song.id).update(song).then(resolve);
  });
