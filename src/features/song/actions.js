import { createAction } from 'redux-starter-kit';

export const bpmSet = createAction('bpmSet');
export const measureCountSet = createAction('measureCountSet');
export const noteDrawn = createAction('noteDrawn');
export const noteErased = createAction('noteErased');
export const notesDeleted = createAction('notesDeleted');
export const notesDragged = createAction('notesDragged');
export const notesDuplicated = createAction('notesDuplicated');
export const notesMovedOctaveDown = createAction('notesMovedOctaveDown');
export const notesMovedOctaveUp = createAction('notesMovedOctaveUp');
export const notesNudged = createAction('notesNudged');
export const notesResized = createAction('notesResized');
export const redoRequested = createAction('redoRequested');
export const sequenceAdded = createAction('sequenceAdded');
export const sequenceDeleted = createAction('sequenceDeleted');
export const sequenceDuplicated = createAction('sequenceDuplicated');
export const sequenceEdited = createAction('sequenceEdited');
export const songLoaded = createAction('songLoaded');
export const syncStarted = createAction('syncStarted');
export const syncSucceeded = createAction('syncSucceeded');
export const trackAdded = createAction('trackAdded');
export const trackDeleted = createAction('trackDeleted');
export const trackIsMutedToggled = createAction('trackIsMutedToggled');
export const trackIsSoloingToggled = createAction('trackIsSoloingToggled');
export const trackVoiceSet = createAction('trackVoiceSet');
export const trackVolumeSet = createAction('trackVolumeSet');
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
