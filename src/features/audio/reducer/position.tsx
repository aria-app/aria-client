import { createSlice, PayloadAction } from 'redux-starter-kit';
import * as actions from '../actions';

export default createSlice<number, {}>({
  name: 'position',
  initialState: 0,
  extraReducers: {
    [actions.positionRequestSucceeded.type]: (
      state,
      action: PayloadAction<number>,
    ) => action.payload,
  },
  reducers: {},
});
