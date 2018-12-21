import { db } from '../constants';

export const deleteSong = song =>
  db.collection('songs').doc(song.id).delete();
