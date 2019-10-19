import { createSlice, PayloadAction } from 'redux-starter-kit';
import { User } from '../../shared/types';
import * as actions from '../actions';

export default createSlice<User | null, {}>({
  name: 'user',
  initialState: null,
  extraReducers: {
    [actions.userSignInSucceeded.type]: (state, action: PayloadAction<User>) =>
      action.payload,
    [actions.userSignOutSucceeded.type]: () => null,
  },
  reducers: {},
});
