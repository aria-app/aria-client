import shortid from 'shortid';
import * as constants from '../constants';

export function createTrack(voice = constants.defaultVoice) {
  return {
    id: shortid.generate(),
    isMuted: false,
    isSoloing: false,
    volume: -10,
    voice,
  };
}
