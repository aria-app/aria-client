import { v4 } from 'uuid';
import shared from '../shared';

export function createNote({ id, points, sequenceId }) {
  if (typeof points === 'undefined') {
    throw new Error('Please provide points to createNote');
  }

  if (typeof sequenceId === 'undefined') {
    throw new Error('Please provide a sequenceId to createNote');
  }

  return {
    id: id || v4(),
    points,
    sequenceId,
  };
}

export function createSequence({ id, measureCount, position, trackId }) {
  if (typeof measureCount === 'undefined') {
    throw new Error('Please provide a measureCount to createSequence');
  }

  if (typeof position === 'undefined') {
    throw new Error('Please provide a position to createSequence');
  }

  if (typeof trackId === 'undefined') {
    throw new Error('Please provide a trackId to createSequence');
  }

  return {
    id: id || v4(),
    measureCount,
    position,
    trackId,
  };
}

export function createTrack(options) {
  return {
    id: options && options.id || v4(),
    isMuted: false,
    isSoloing: false,
    synthType: options && options.synthType || shared.constants.defaultSynthType,
    volume: 0,
  };
}
