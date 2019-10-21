import { createReducer, PayloadAction } from 'redux-starter-kit';
import shared from '../../shared';

export default createReducer<string, {}>('', {
  [shared.actions.routeNotesEditorLoaded.type]: (
    state,
    action: PayloadAction<{ sequenceId: string; songId: string }>,
  ) => action.payload.sequenceId,
  [shared.actions.routeSongEditorLoaded.type]: () => '',
});
