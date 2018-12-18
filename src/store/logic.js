import audio from '../features/audio';
import auth from '../features/auth';

export default [
  ...audio.logic,
  ...auth.logic,
];
