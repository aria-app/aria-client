import { createReducer } from "redux-create-reducer";
import shared from "../../shared";

const initialValue = 1;

export const measureCount = createReducer(initialValue, {
  [shared.actions.DASHBOARD_LOADED]: (state, action) => initialValue,

  [shared.actions.MEASURE_COUNT_SET]: (state, action) =>
    action.payload.measureCount,

  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.measureCount,
});
