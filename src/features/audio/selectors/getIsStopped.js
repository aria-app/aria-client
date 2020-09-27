import compose from 'lodash/fp/compose';
import isEqual from 'lodash/fp/isEqual';

import Dawww from '../../../dawww';
import { getPlaybackState } from './getPlaybackState';

export const getIsStopped = compose(
  isEqual(Dawww.PLAYBACK_STATES.STOPPED),
  getPlaybackState,
);
