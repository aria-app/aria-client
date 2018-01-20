import getOr from 'lodash/fp/getOr';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const preview = createLogic({
  type: shared.actions.KEY_PRESSED,
  process({ action }) {
    const pitch = getOr(-1, 'payload.pitch', action);
    const trackId = getOr('', 'payload.sequence.trackId', action);

    dawww.preview(trackId, pitch);
  },
});
