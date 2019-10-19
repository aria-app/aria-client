import { createSlice } from 'redux-starter-kit';
import * as actions from '../actions';

export default createSlice({
  name: 'user',
  initialState: null,
  extraReducers: {
    [actions.userSignInSucceeded.type]: (state, action) => action.payload,
    [actions.userSignOutSucceeded.type]: () => null,
  },
  reducers: {},
});
