import getOr from 'lodash/fp/getOr';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const previewNudgedNote = createLogic({
  type: shared.actions.NOTES_NUDGED,
  process({ action }) {
    const deltaY = getOr(0, 'payload.delta.y', action);
    const basePitch = getOr(-1, 'payload.notes[0].points[0].y', action);
    const adjustedPitch = basePitch + deltaY;
    const trackId = getOr('', 'payload.sequence.trackId', action);

    dawww.preview(trackId, adjustedPitch);
  },
});
