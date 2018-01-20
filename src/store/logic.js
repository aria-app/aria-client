import app from '../features/app';
import audio from '../features/audio';

export default [
  ...app.logic,
  ...audio.logic,
];
