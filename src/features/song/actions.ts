import { createAction } from 'redux-starter-kit';
import {
  Note,
  Point,
  Sequence,
  Song,
  Track,
  TrackWithSequences,
} from '../shared/types';

export const bpmSet = createAction<number>('bpmSet');
export const measureCountSet = createAction<number>('measureCountSet');
export const noteDrawn = createAction<{ point: Point; sequence: Sequence }>(
  'noteDrawn',
);
export const noteErased = createAction<Note>('noteErased');
export const notesDeleted = createAction<Array<Note>>('notesDeleted');
export const notesDragged = createAction<Array<Note>>('notesDragged');
export const notesDuplicated = createAction<Array<Note>>('notesDuplicated');
export const notesMovedOctaveDown = createAction<Array<Note>>(
  'notesMovedOctaveDown',
);
export const notesMovedOctaveUp = createAction<Array<Note>>(
  'notesMovedOctaveUp',
);
export const notesNudged = createAction<{
  delta: Point;
  notes: Array<Note>;
  sequence: Sequence;
}>('notesNudged');
export const notesResized = createAction<Array<Note>>('notesResized');
export const redoRequested = createAction('redoRequested');
export const sequenceAdded = createAction<Sequence>('sequenceAdded');
export const sequenceDeleted = createAction<Sequence>('sequenceDeleted');
export const sequenceDuplicated = createAction<{
  duplicatedSequence: Sequence;
  originalSequence: Sequence;
}>('sequenceDuplicated');
export const sequenceEdited = createAction<Sequence>('sequenceEdited');
export const songLoaded = createAction<Song>('songLoaded');
export const syncStarted = createAction('syncStarted');
export const syncSucceeded = createAction('syncSucceeded');
export const trackAdded = createAction<{ sequence: Sequence; track: Track }>(
  'trackAdded',
);
export const trackDeleted = createAction<Track>('trackDeleted');
export const trackIsMutedToggled = createAction<Track>('trackIsMutedToggled');
export const trackIsSoloingToggled = createAction<Track>(
  'trackIsSoloingToggled',
);
export const trackVoiceSet = createAction<{
  track: TrackWithSequences;
  voice: string;
}>('trackVoiceSet');
export const trackVolumeSet = createAction<{
  track: TrackWithSequences;
  volume: string;
}>('trackVolumeSet');
export const undoRequested = createAction('undoRequested');

export const undoableActions = [
  bpmSet.type,
  measureCountSet.type,
  noteDrawn.type,
  noteErased.type,
  notesDeleted.type,
  notesDragged.type,
  notesDuplicated.type,
  notesMovedOctaveDown.type,
  notesMovedOctaveUp.type,
  notesNudged.type,
  notesResized.type,
  sequenceAdded.type,
  sequenceDeleted.type,
  sequenceDuplicated.type,
  sequenceEdited.type,
  trackAdded.type,
  trackDeleted.type,
  trackIsMutedToggled.type,
  trackIsSoloingToggled.type,
  trackVoiceSet.type,
  trackVolumeSet.type,
];

export const serverUpdatingActions = [
  bpmSet.type,
  measureCountSet.type,
  noteDrawn.type,
  noteErased.type,
  notesDeleted.type,
  notesDragged.type,
  notesDuplicated.type,
  notesMovedOctaveDown.type,
  notesMovedOctaveUp.type,
  notesNudged.type,
  notesResized.type,
  redoRequested.type,
  sequenceAdded.type,
  sequenceDeleted.type,
  sequenceDuplicated.type,
  sequenceEdited.type,
  trackAdded.type,
  trackDeleted.type,
  trackIsMutedToggled.type,
  trackIsSoloingToggled.type,
  trackVoiceSet.type,
  trackVolumeSet.type,
  undoRequested.type,
];
