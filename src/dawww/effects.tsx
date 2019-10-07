import instrumentsEffects from './instruments/effects';
import partsEffects from './parts/effects';
import playbackStateEffects from './playbackState/effects';
import songEffects from './song/effects';
import transportPartEffects from './transportPart/effects';
import volumeNodesEffects from './volumeNodes/effects';

export default function effects(...args) {
  instrumentsEffects(...args);
  partsEffects(...args);
  playbackStateEffects(...args);
  songEffects(...args);
  transportPartEffects(...args);
  volumeNodesEffects(...args);
}
