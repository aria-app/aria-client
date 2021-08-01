import * as Tone from 'tone';

import { AudioManagerType, Sequence, Song } from '../types';
import * as actions from './actions';
import { channels, emit, on } from './bus';
import * as constants from './constants';
import { effects } from './effects';
import * as helpers from './helpers';
import { songToDawwwSong, updateDawwwSongSequence } from './helpers';
import * as models from './models';
import { reducer } from './reducer';
import * as selectors from './selectors';
import { getState, setState } from './state';
import { createToneAdapter } from './toneAdapter';

export interface DawwwOptions {
  song?: Song;
}

export function Dawww(options?: DawwwOptions): AudioManagerType {
  const dispatch = emit(channels.ACTION_OCCURRED);
  const toneAdapter = createToneAdapter(Tone);
  const shared = {
    helpers,
    dispatch,
    models,
    selectors,
    toneAdapter,
  };
  const updateSequence = (sequence: Sequence) => {
    const prevSong = getState().song;

    dispatch(
      actions.songUpdated({
        prevSong,
        song: updateDawwwSongSequence(prevSong, sequence),
      }),
    );
  };

  const updateSong = (updatedSong: Song) => {
    dispatch(
      actions.songUpdated({
        prevSong: getState().song,
        song: songToDawwwSong(updatedSong),
      }),
    );
  };

  on(channels.ACTION_OCCURRED, (action) => {
    setState(reducer(getState(), action, shared));

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
    options?.song || {
      bpm: 0,
      createdAt: '2000-01-01',
      id: -1,
      measureCount: 0,
      name: '',
      updatedAt: '2000-01-01',
      user: {
        id: -1,
      },
      tracks: [],
    },
  );

  return {
    constants,
    helpers,
    onPositionChange: (fn) => on(channels.POSITION_SET, fn),
    onPlaybackStateChange: (fn) => on(channels.PLAYBACK_STATE_SET, fn),
    pause: () => dispatch(actions.playbackPauseRequested()),
    preview: (trackId, pitch) =>
      dispatch(actions.notePlayed({ pitch, trackId })),
    setPosition: (position) => dispatch(actions.positionSetRequested(position)),
    start: () => dispatch(actions.playbackStartRequested()),
    stop: () => dispatch(actions.playbackStopRequested()),
    updateSequence,
    updateSong,
  };
}

Dawww.BPM_RANGE = constants.BPM_RANGE;
Dawww.DEFAULT_BPM = constants.DEFAULT_BPM;
Dawww.DEFAULT_MEASURE_COUNT = constants.DEFAULT_MEASURE_COUNT;
Dawww.DEFAULT_SONG_NAME = constants.DEFAULT_SONG_NAME;
Dawww.DEFAULT_VOICE = constants.DEFAULT_VOICE;
Dawww.MAX_BPM = constants.MAX_BPM;
Dawww.MIN_BPM = constants.MIN_BPM;
Dawww.OCTAVE_RANGE = constants.OCTAVE_RANGE;
Dawww.PLAYBACK_STATES = constants.PLAYBACK_STATES;
Dawww.VOICES = constants.VOICES;

Dawww.addPoints = helpers.addPoints;
Dawww.getLetterFromPitch = helpers.getLetterFromPitch;
Dawww.getNoteLength = helpers.getNoteLength;
Dawww.getNotesInArea = helpers.getNotesInArea;
Dawww.getPitchName = helpers.getPitchName;
Dawww.getPointOffset = helpers.getPointOffset;
Dawww.measuresToTime = helpers.measuresToTime;
Dawww.sizeToTime = helpers.sizeToTime;
Dawww.someNoteWillMoveOutside = helpers.someNoteWillMoveOutside;
Dawww.translateNote = helpers.translateNote;
