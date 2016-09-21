import * as _ from 'lodash';
import Instrument from './instrument';

export function createChannel(track) {
  if (!track.id) {
    throw new Error('Tracks must have an id');
  }

  if (!track.synthType) {
    throw new Error('Tracks must have a synthType');
  }

  return {
    id: track.id,
    instrument: Instrument.create(track.id, track.synthType),
  };
}

export function sizeToTime(size) {
  if (!_.isNumber(size)) {
    throw new Error('Size must be a number');
  }

  return `(${size + 1} * 32n)`;
}
