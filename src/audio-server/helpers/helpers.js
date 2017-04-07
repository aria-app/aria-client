import Instrument from '../instrument';

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
