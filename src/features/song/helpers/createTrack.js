import { v4 } from 'uuid';
import shared from '../../shared';

export function createTrack(options) {
  return {
    id: (options && options.id) || v4(),
    isMuted: false,
    isSoloing: false,
    synthType: (options && options.synthType) || shared.constants.defaultSynthType,
    volume: 0,
  };
}
