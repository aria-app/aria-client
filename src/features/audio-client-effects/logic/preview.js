import getOr from 'lodash/fp/getOr';
import { createLogic } from 'redux-logic';
import sequenceData from '../../sequence-data';
import dawww from '../dawww';

export const preview = createLogic({
  type: sequenceData.actions.KEY_PRESSED,
  process({ action }) {
    const pitch = getOr(-1, 'payload.pitch', action);
    const trackId = getOr('', 'payload.trackId', action);

    dawww.preview(trackId, pitch);
  },
});
