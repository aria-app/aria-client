import shortid from 'shortid';
import * as constants from '../constants';

export function createTrack(options) {
  return {
    id: (options && options.id) || shortid.generate(),
    isMuted: false,
    isSoloing: false,
    voice: (options && options.voice) || constants.defaultVoice,
    volume: 0,
  };
}
