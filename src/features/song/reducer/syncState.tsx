import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

const { SYNC_STATES } = shared.constants;

export default createSlice({
  name: 'syncState',
  initialState: SYNC_STATES.SYNCED,
  extraReducers: {
    [shared.actions.SONG_ADD_REQUEST_STARTED]: () => SYNC_STATES.SYNCING,
    [shared.actions.SONG_ADD_REQUEST_SUCCEEDED]: () => SYNC_STATES.SYNCED,
    [shared.actions.SYNC_STARTED]: () => SYNC_STATES.SYNCING,
    [shared.actions.SYNC_SUCCEEDED]: () => SYNC_STATES.SYNCED,
  },
  reducers: {},
});
