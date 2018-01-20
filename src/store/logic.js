import app from '../features/app';
import audio from '../features/audio';
import sequencer from '../features/sequencer';
import shortcuts from '../features/shortcuts';

export default [
  ...app.logic,
  ...audio.logic,
  ...sequencer.logic,
  ...shortcuts.logic,
];
