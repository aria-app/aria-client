import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

export default createSlice({
  name: 'focusedSequenceId',
  initialState: '',
  extraReducers: {
    [shared.actions.NOTES_EDITOR_LOADED]: (state, action) =>
      action.payload.sequenceId,
    [shared.actions.SONG_EDITOR_LOADED]: () => '',
  },
  reducers: {},
});
