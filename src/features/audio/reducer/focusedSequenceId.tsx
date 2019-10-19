import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

export default createSlice<string, {}>({
  name: 'focusedSequenceId',
  initialState: '',
  extraReducers: {
    [shared.actions.ROUTE_NOTES_EDITOR_LOADED]: (state, action) =>
      action.payload.sequenceId,
    [shared.actions.ROUTE_SONG_EDITOR_LOADED]: () => '',
  },
  reducers: {},
});
