import shortid from 'shortid';
import { InstrumentType } from '../../features/shared/types';
import * as constants from '../constants';

export function createTrack(voice: InstrumentType = constants.DEFAULT_VOICE) {
  return {
    id: shortid.generate(),
    isMuted: false,
    isSoloing: false,
    volume: -10,
    voice,
  };
}
