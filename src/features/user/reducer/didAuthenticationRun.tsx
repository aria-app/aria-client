import { createSlice } from 'redux-starter-kit';
import * as actions from '../actions';

export default createSlice({
  name: 'didAuthenticationRun',
  initialState: false,
  extraReducers: {
    [actions.userSignInSucceeded.type]: () => true,
    [actions.userSignOutSucceeded.type]: () => true,
  },
  reducers: {},
});
