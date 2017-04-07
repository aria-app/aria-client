import { NAME } from '../constants';

export const SELECTED_NOTES_POSITION_NUDGED = `${NAME}/SELECTED_NOTES_POSITION_NUDGED`;
export const SELECTED_NOTES_SIZE_NUDGED = `${NAME}/SELECTED_NOTES_SIZE_NUDGED`;

export const selectedNotesPositionNudged = change => ({
  type: SELECTED_NOTES_POSITION_NUDGED,
  change,
});

export const selectedNotesSizeNudged = change => ({
  type: SELECTED_NOTES_SIZE_NUDGED,
  change,
});
