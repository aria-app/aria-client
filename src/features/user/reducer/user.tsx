import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

export default createSlice({
  name: 'user',
  initialState: null,
  extraReducers: {
    [shared.actions.USER_SIGN_IN_SUCCEEDED]: (state, action) =>
      action.payload.user,
    [shared.actions.USER_SIGN_OUT_SUCCEEDED]: () => null,
  },
  reducers: {},
});
