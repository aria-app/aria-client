import getOr from 'lodash/fp/getOr';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const previewDraggedNote = createLogic({
  type: shared.actions.NOTES_DRAG_PREVIEWED,
  process({ action }) {
    const pitch = getOr(-1, 'payload.notes[0].points[0].y', action);
    const trackId = getOr('', 'payload.sequence.trackId', action);

    dawww.preview(trackId, pitch);
  },
});
