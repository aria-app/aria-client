import { NAME } from './constants';

export const BPM_MODAL_CLOSED = `${NAME}/BPM_MODAL_CLOSED`;
export const BPM_MODAL_OPENED = `${NAME}/BPM_MODAL_OPENED`;
export const BPM_SET = `${NAME}/BPM_SET`;
export const FILE_DRAG_CANCELLED = `${NAME}/FILE_DRAG_CANCELLED`;
export const FILE_DRAG_STARTED = `${NAME}/FILE_DRAG_STARTED`;
export const SONG_LOADED = `${NAME}/SONG_LOADED`;

export const bpmModalClosed = () => ({
  type: BPM_MODAL_CLOSED,
});

export const bpmModalOpened = () => ({
  type: BPM_MODAL_OPENED,
});

export const bpmSet = ({ bpm }) => ({
  type: BPM_SET,
  bpm,
});

export const fileDragCancelled = () => ({
  type: FILE_DRAG_CANCELLED,
});

export const fileDragStarted = () => ({
  type: FILE_DRAG_STARTED,
});

export const songLoaded = ({ song }) => ({
  type: SONG_LOADED,
  song,
});
