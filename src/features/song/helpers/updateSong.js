import { db } from '../constants';

export const updateSong = (song) => new Promise((resolve) => {
	db.collection('songs').doc(song.id).update(song).then(resolve);
});
