import compose from 'lodash/fp/compose';
import curry from 'lodash/fp/curry';
import first from 'lodash/fp/first';
import get from 'lodash/fp/get';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import { v4 } from 'uuid';
import shared from '../shared';

export const addPoints = curry((b, a) => ({
  x: a.x + b.x,
  y: a.y + b.y,
}));

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
    id: (options && options.id) || v4(),
    isMuted: false,
    isSoloing: false,
    synthType: (options && options.synthType) || shared.constants.defaultSynthType,
    volume: 0,
  };
}

export const duplicateNotes = map(note => createNote({
  points: note.points,
  sequenceId: note.sequenceId,
}));

export function getIsInside(start, end, target) {
  const tx = target.x;
  const ty = target.y;
  const x1 = Math.min(start.x, end.x);
  const x2 = Math.max(start.x, end.x);
  const y1 = Math.min(start.y, end.y);
  const y2 = Math.max(start.y, end.y);

  return x1 <= tx && tx <= x2
    && y1 <= ty && ty <= y2;
}

export function getNotesInArea(start, end, allNotes) {
  if (isEqual(start, end)) return [];
  return allNotes.filter(n => getIsInside(start, end, first(n.points)));
}

export function getType(synth) {
  return synth.voices[0].oscillator.type;
}

export function isOutOfBounds(measureCount) {
  return some(point =>
    point.x < 0 ||
    point.x > ((measureCount * 8) * 4) - 1 ||
    point.y < 0 ||
    point.y > (shared.constants.octaveRange.length * 12) - 1,
  );
}

export function someNoteWillMoveOutside(measureCount, delta, notes) {
  const hasPointOutside = compose(
    isOutOfBounds(measureCount),
    map(addPoints(delta)),
    get('points'),
  );
  return some(hasPointOutside, notes);
}

export const translateNote = curry((delta, note) => ({
  ...note,
  points: map(addPoints(delta), note.points),
}));
