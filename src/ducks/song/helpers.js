import { v4 } from 'node-uuid';
import shared from 'ducks/shared';

export function createSequence(options) {
  if (typeof options.measureCount === 'undefined') {
    throw new Error('Please provide a measureCount to createSequence');
  }

  if (typeof options.position === 'undefined') {
    throw new Error('Please provide a position to createSequence');
  }

  if (typeof options.trackId === 'undefined') {
    throw new Error('Please provide a trackId to createSequence');
  }

  return {
    id: v4(),
    measureCount: options.measureCount,
    position: options.position,
    notes: options.notes || [],
    trackId: options.trackId,
  };
}

export function createTrack(synthType) {
  return {
    id: v4(),
    synthType: synthType || shared.constants.defaultSynthType,
  };
}
