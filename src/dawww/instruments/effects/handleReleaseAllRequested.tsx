import getOr from 'lodash/fp/getOr';
import invoke from 'lodash/fp/invoke';

export function handleReleaseAllRequested(getState, action, shared) {
  const instruments = getOr({}, `instruments`, getState());

  Object.values(instruments).forEach(instrument => {
    invoke('releaseAll', instrument);
  });
}
