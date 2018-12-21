import Dawww from 'dawww';
import { db } from '../constants';

export const createSong = (user, options = {}) => {
	const song = {
		...Dawww.createSong(),
		userId: user.uid,
    ...options,
	};

	return db.collection('songs').doc(song.id).set(song).then(() => song);
};
