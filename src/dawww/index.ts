import getOr from 'lodash/fp/getOr';
import omit from 'lodash/fp/omit';
import uniqBy from 'lodash/fp/uniqBy';
import Tone from 'tone';

import { Note, Sequence, Song } from '../types';
import * as actions from './actions';
import { channels, emit, on } from './bus';
import * as constants from './constants';
import { effects } from './effects';
import * as helpers from './helpers';
import { setAtIds } from './helpers';
import * as models from './models';
import { reducer } from './reducer';
import * as selectors from './selectors';
import { getState, setState } from './state';
import { createToneAdapter } from './toneAdapter';

export interface DawwwOptions {
  song?: Song;
}

export default function Dawww(options?: DawwwOptions): any {
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
    const prevSong = getOr({ notes: {}, sequences: {} }, 'song', getState());

    dispatch(
      actions.songUpdated({
        prevSong,
        song: {
          ...prevSong,
          focusedSequenceId: sequence.id,
          notes: setAtIds(
            uniqBy<Note>(
              (note) => note.id,
              sequence.notes.map((note) => ({
                ...note,
                sequenceId: note.sequence.id,
              })),
            ),
            prevSong.notes,
          ),
          sequences: setAtIds([sequence], prevSong.sequences),
        },
      }),
    );
  };

  const updateSong = (song: Song) => {
    const allSequences = song.tracks.map((track) => track.sequences).flat();

    const formattedSong = {
      ...song,
      focusedSequenceId: '',
      notes: setAtIds(
        allSequences
          .map((sequence) =>
            sequence.notes.map((note) => ({
              ...note,
              sequenceId: note.sequence.id,
            })),
          )
          .flat(),
        {},
      ),
      sequences: setAtIds(
        allSequences.map((sequence) =>
          omit(['notes'], { ...sequence, trackId: sequence.track.id }),
        ),
        {},
      ),
      tracks: setAtIds(
        song.tracks.map((track) =>
          omit(['sequences'], {
            ...track,
            voice: track.voice.toneOscillatorType,
          }),
        ),
        {},
      ),
    };

    dispatch(
      actions.songUpdated({
        prevSong: getOr({}, 'song', getState()),
        song: formattedSong,
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
    getOr(
      {
        bpm: -1,
        createdAt: new Date(),
        id: -1,
        measureCount: 0,
        name: '',
        updatedAt: new Date(),
        user: {
          id: -1,
        },
        tracks: [],
      },
      'song',
      options,
    ),
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
Dawww.getLetterFromPitch = helpers.getLetterFromPitch;
Dawww.getNoteLength = helpers.getNoteLength;
Dawww.getNotesInArea = helpers.getNotesInArea;
Dawww.getPitchName = helpers.getPitchName;
Dawww.getPointOffset = helpers.getPointOffset;
Dawww.measuresToTime = helpers.measuresToTime;
Dawww.sizeToTime = helpers.sizeToTime;
Dawww.someNoteWillMoveOutside = helpers.someNoteWillMoveOutside;
Dawww.translateNote = helpers.translateNote;
