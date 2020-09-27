import getOr from 'lodash/fp/getOr';

import * as actions from '../../actions';

export function handleTrackDeletionRequest(getState, action, shared) {
  const track = getOr({}, 'payload.track', action);
  const id = getOr('', 'id', action);
  const instrument = getOr({}, `instruments[${id}]`, getState());
  const volumeNode = getOr({}, `volumeNodes[${id}]`, getState());

  shared.models.instrument.dispose(instrument);

  shared.models.volumeNode.dispose(volumeNode);

  shared.dispatch(actions.trackDeletionAccepted(track));
}
