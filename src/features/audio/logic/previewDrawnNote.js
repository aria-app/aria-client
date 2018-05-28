import getOr from 'lodash/fp/getOr';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const previewDrawnNote = createLogic({
  type: shared.actions.NOTE_DRAWN,
  process({ action }) {
    const pitch = getOr(-1, 'payload.point.y', action);
    const trackId = getOr('', 'payload.sequence.trackId', action);

    dawww.preview(trackId, pitch);
  },
});
