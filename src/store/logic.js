import audio from '../features/audio';
import auth from '../features/auth';
import song from '../features/song';

export default [
  ...audio.logic,
  ...auth.logic,
  ...song.logic,
];
