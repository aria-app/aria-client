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
      dispatch(actions.notePlayed({ pitch, trackId })),
    setPosition: position => dispatch(actions.positionSetRequested(position)),
    start: () => dispatch(actions.playbackStartRequested()),
    stop: () => dispatch(actions.playbackStopRequested()),
    updateSong,
  };
}

Dawww.BPM_RANGE = constants.BPM_RANGE;
Dawww.DEFAULT_BPM = constants.DEFAULT_BPM;
Dawww.DEFAULT_MEASURE_COUNT = constants.DEFAULT_MEASURE_COUNT;
Dawww.DEFAULT_SONG_NAME = constants.DEFAULT_SONG_NAME;
Dawww.DEFAULT_VOICE = constants.DEFAULT_VOICE;
Dawww.DIFF_KIND_A = constants.DIFF_KIND_A;
Dawww.DIFF_KIND_D = constants.DIFF_KIND_D;
Dawww.DIFF_KIND_E = constants.DIFF_KIND_E;
Dawww.DIFF_KIND_N = constants.DIFF_KIND_N;
Dawww.MAX_BPM = constants.MAX_BPM;
Dawww.MIN_BPM = constants.MIN_BPM;
Dawww.OCTAVE_RANGE = constants.OCTAVE_RANGE;
Dawww.PLAYBACK_STATES = constants.PLAYBACK_STATES;
Dawww.SCALE = constants.SCALE;
Dawww.VOICES = constants.VOICES;

Dawww.addPoints = helpers.addPoints;
Dawww.createNote = helpers.createNote;
Dawww.createSequence = helpers.createSequence;
Dawww.createSong = helpers.createSong;
Dawww.createTrack = helpers.createTrack;
Dawww.duplicateNotes = helpers.duplicateNotes;
Dawww.getLetterFromPitch = helpers.getLetterFromPitch;
Dawww.getNoteLength = helpers.getNoteLength;
Dawww.getNotesInArea = helpers.getNotesInArea;
Dawww.getPitchName = helpers.getPitchName;
Dawww.getPointOffset = helpers.getPointOffset;
Dawww.measuresToTime = helpers.measuresToTime;
Dawww.resizeNote = helpers.resizeNote;
Dawww.setAtIds = helpers.setAtIds;
Dawww.sizeToTime = helpers.sizeToTime;
Dawww.someNoteWillMoveOutside = helpers.someNoteWillMoveOutside;
Dawww.translateNote = helpers.translateNote;
