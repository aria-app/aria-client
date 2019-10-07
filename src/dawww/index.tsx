import getOr from 'lodash/fp/getOr';
import Tone from 'tone';
import { channels, emit, on } from './bus';
import * as actions from './actions';
import * as constants from './constants';
import * as helpers from './helpers';
import * as models from './models';
import * as selectors from './selectors';
import { getState, setState } from './state';
import effects from './effects';
import reducer from './reducer';
import { createToneAdapter } from './toneAdapter';

export default function Dawww(options) {
  const dispatch = emit(channels.ACTION_OCCURRED);
  const toneAdapter = createToneAdapter(Tone);
  const shared = {
    helpers,
    dispatch,
    models,
    selectors,
    toneAdapter,
  };
  const updateSong = song =>
    dispatch(
      actions.songUpdated({
        prevSong: getOr({}, 'song', getState()),
        song,
      }),
    );

  on(channels.ACTION_OCCURRED, action => {
    setState(reducer(getState(), action, shared));

    // console.log('ACTION_OCCURRED', action, getState());
    effects(getState, action, shared);

    if (action.type === actions.POSITION_SET) {
      emit(channels.POSITION_SET)(action.payload.position);
    }

    if (action.type === actions.PLAYBACK_STATE_SET) {
      emit(channels.PLAYBACK_STATE_SET)(action.payload.playbackState);
    }
  });

  // Load initial song data
  updateSong(
    getOr(
      {
        notes: {},
        sequences: {},
        tracks: {},
      },
      'song',
      options,
    ),
  );

  return {
    onPositionChange: fn => on(channels.POSITION_SET, fn),
    onStateChange: fn => on(channels.PLAYBACK_STATE_SET, fn),
    pause: () => dispatch(actions.playbackPauseRequested()),
    preview: (trackId, pitch) =>
      dispatch(
        actions.notePlayed({
          pitch,
          trackId,
        }),
      ),
    setPosition: (...args) => dispatch(actions.positionSetRequested(...args)),
    start: () => dispatch(actions.playbackStartRequested()),
    stop: () => dispatch(actions.playbackStopRequested()),
    updateSong,
  };
}

/* eslint-disable import/namespace */
Object.keys(constants).forEach(key => {
  Dawww[key] = constants[key];
});
Object.keys(helpers).forEach(key => {
  Dawww[key] = helpers[key];
});
