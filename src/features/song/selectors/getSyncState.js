import getOr from 'lodash/fp/getOr';
import shared from '../../shared';
import { NAME } from '../constants';

const { SYNC_STATES } = shared.constants;

export const getSyncState = getOr(
  SYNC_STATES.SYNCED,
  `${NAME}.present.syncState`,
);
