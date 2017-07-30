import shortid from 'shortid';
import * as constants from '../constants';

export function createTrack(options) {
  return {
    id: (options && options.id) || shortid.generate(),
    isMuted: false,
    isSoloing: false,
    synthType: (options && options.synthType) || constants.defaultSynthType,
    volume: 0,
  };
}
