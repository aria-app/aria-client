import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

export default createSlice({
  name: 'didAuthenticationRun',
  initialState: false,
  extraReducers: {
    [shared.actions.USER_SIGN_IN_SUCCEEDED]: () => true,
    [shared.actions.USER_SIGN_OUT_SUCCEEDED]: () => true,
  },
  reducers: {},
});
