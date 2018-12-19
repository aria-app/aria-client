import { db } from '../constants';

export const fetchSongsByUserId = (userId) =>
	db.collection('songs')
    .where('userId', '==', userId)
    .get()
		.then((querySnapshot) =>
      querySnapshot.docs.map(doc => doc.data())
    );
