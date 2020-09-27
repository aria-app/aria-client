import { createReducer } from 'redux-starter-kit';

import shared from '../../shared';

export default createReducer('', {
  [shared.actions.routeNotesEditorLoaded.type]: (state, action) =>
    action.payload.sequenceId,
  [shared.actions.routeSongEditorLoaded.type]: () => '',
});
