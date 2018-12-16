import Dawww from 'dawww';
import { authenticate } from './authenticate';
import { db } from '../constants';

const createSong = (user) => new Promise((resolve) => {
	const song = {
		...Dawww.createSong(),
		userId: user.uid,
	};

	db.collection('songs').doc(song.id).set(song)
		.then(() => {
			resolve(song);
		});
});

export const fetchUserSong = () => new Promise((resolve) => {
	authenticate().then((user) => {
		db.collection('songs').where('userId', '==', user.uid).get()
			.then((querySnapshot) => {
				if (querySnapshot.empty) {
					return createSong(user).then(resolve);
				}

				const results = [];

				querySnapshot.forEach((doc) => {
					results.push(doc.data());
				});

				return resolve(results[0]);
			});
	});
});
