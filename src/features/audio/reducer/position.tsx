import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

export default createSlice({
  name: 'position',
  initialState: 0,
  extraReducers: {
    [shared.actions.POSITION_REQUEST_SUCCEEDED]: (state, action) =>
      action.payload.position,
  },
  reducers: {},
});
