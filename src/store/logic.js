import audio from '../features/audio';
import auth from '../features/auth';
import song from '../features/song';
import user from '../features/user';

export default [
  ...audio.logic,
  ...auth.logic,
  ...song.logic,
  ...user.logic,
];
