import { authenticate } from './authenticate';
import { db } from '../constants';

export const updateSong = (song) => new Promise((resolve) => {
	authenticate().then(() => {
		db.collection('songs').doc(song.id).update(song).then(resolve);
	});
});
