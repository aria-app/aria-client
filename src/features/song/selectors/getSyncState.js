import getOr from 'lodash/fp/getOr';

import shared from '../../shared';

const { SYNC_STATES } = shared.constants;

export const getSyncState = getOr(SYNC_STATES.SYNCED, 'song.present.syncState');
