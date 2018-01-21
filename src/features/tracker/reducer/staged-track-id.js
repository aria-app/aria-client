import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer('', {
  [shared.actions.TRACK_EDITING_FINISHED]: () =>
    '',

  [shared.actions.TRACK_EDITING_STARTED]: (state, action) =>
    action.payload.track.id,
});
