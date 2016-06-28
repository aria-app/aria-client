import Instrument from './instrument';

export function createChannel(track) {
  return {
    id: track.id,
    instrument: Instrument.create(track.synthType),
  };
}

export function sizeToSeconds(size) {
  return `(${size + 1} * 32n)`;
}
