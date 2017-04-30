import { v4 } from 'uuid';
import * as constants from '../constants';

export function createTrack(options) {
  return {
    id: (options && options.id) || v4(),
    isMuted: false,
    isSoloing: false,
    synthType: (options && options.synthType) || constants.defaultSynthType,
    volume: 0,
  };
}
