import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { requestKeyPreview } from './request-key-preview';
import { requestPlaybackPause } from './requestPlaybackPause';
import { requestPlaybackStart } from './requestPlaybackStart';
import { requestPlaybackStop } from './requestPlaybackStop';
import requestSequencePost from './requestSequencePost';
import requestSequenceUpdate from './requestSequenceUpdate';
import requestSequencesPost from './requestSequencesPost';
import requestSongPost from './requestSongPost';
import { subscribeToPlaybackState } from './subscribeToPlaybackState';
import { subscribeToPosition } from './subscribe-to-position';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';

export default function* saga() {
  yield [
    takeEvery(appData.actions.PLAYBACK_PAUSE_REQUESTED, requestPlaybackPause),
    takeEvery(appData.actions.PLAYBACK_START_REQUESTED, requestPlaybackStart),
    takeEvery(appData.actions.PLAYBACK_STOP_REQUESTED, requestPlaybackStop),
    takeEvery(sequenceData.actions.KEY_PRESSED, requestKeyPreview),
    takeEvery(shared.actions.INITIALIZED, subscribeToPlaybackState),
    takeEvery(shared.actions.INITIALIZED, subscribeToPosition),
    fork(requestSequencePost),
    fork(requestSequenceUpdate),
    fork(requestSequencesPost),
    fork(requestSongPost),
  ];
}

// Saga
// sequenceData.actions.KEY_PRESSED, requestKeyPreview
//  -> request a note preview from audio server
// shared.actions.INITIALIZED, subscribeToPosition
//  -> Use fast event channel from server to dispatch position updates
// shared.actions.INITIALIZED, subscribeToPlaybackState
//  -> Use fast event channel from server to dispatch playbackState updates

// Overview
// initialized            -> client gets subscriptions
// notes updated          -> client sends updated sequence to server
// pause requested        -> client sends pause request to server
// play requested         -> client sends play request to server
// position set requested -> client sends position set request to server
// sequences updated      -> client sends updated track to server
// sequence opened        -> client sends loop points set request to server
// song loaded            -> client sends song to server
// stop requested         -> client sends stop request to server
// tracks updated         -> client sends updated song to server
//
// Data structures sent to audio server must be formatted to make them easy to play
// sequence = {
//   trackId: 'a',
//   data: [[{ name: 'C4', length: '(4 * 32n)' }][][][] ... 32x total ... [][][]],
//   position: 2, // Offset by 2 measures
// };
// All names in sequence `data` will be played during given slot
// track = { id: 'a', type: 'square' };
// song = { measureCount: 4 };
//

// export const NOTE_PREVIEW_REQUESTED = `${NAME}/NOTE_PREVIEW_REQUESTED`;
// export const PAUSE_REQUEST_STARTED = `${NAME}/PAUSE_REQUEST_STARTED`;
// export const PAUSE_REQUEST_SUCCEEDED = `${NAME}/PAUSE_REQUEST_SUCCEEDED`;
// export const PLAY_REQUEST_STARTED = `${NAME}/PLAY_REQUEST_STARTED`;
// export const PLAY_REQUEST_SUCCEEDED = `${NAME}/PLAY_REQUEST_SUCCEEDED`;
// export const STOP_REQUEST_STARTED = `${NAME}/STOP_REQUEST_STARTED`;
// export const STOP_REQUEST_SUCCEEDED = `${NAME}/STOP_REQUEST_SUCCEEDED`;
// export const POSITION_SET_REQUEST_STARTED = `${NAME}/POSITION_SET_REQUEST_STARTED`;
// export const POSITION_SET_REQUEST_SUCCEEDED = `${NAME}/POSITION_SET_REQUEST_SUCCEEDED`;
// export const SEQUENCE_STEP_TRIGGERED = `${NAME}/SEQUENCE_STEP_TRIGGERED`;
// export const SEQUENCES_SET = `${NAME}/SEQUENCES_SET`;
// export const SEQUENCES_UPDATED = `${NAME}/SEQUENCES_UPDATED`;
// export const SONG_POSITION_SET = `${NAME}/SONG_POSITION_SET`;
// export const SONG_SEQUENCE_SET = `${NAME}/SONG_SEQUENCE_SET`;
// export const SONG_SEQUENCE_STEP_TRIGGERED = `${NAME}/SONG_SEQUENCE_STEP_TRIGGERED`;
// export const START_POINT_SET = `${NAME}/START_POINT_SET`;
// export const TRANSPORT_POSITION_SET = `${NAME}/TRANSPORT_POSITION_SET`;
