import { takeEvery } from 'redux-saga';
import { requestKeyPreview } from './request-key-preview';
import { subscribeToPosition } from './subscribe-to-position';
import sequenceView from '../../sequence-view';
import shared from '../../shared';

export default function* saga() {
  yield [
    takeEvery(sequenceView.actions.KEY_PRESSED, requestKeyPreview),
    takeEvery(shared.actions.INITIALIZED, subscribeToPosition),
  ];
}

// Saga
// sequenceView.actions.KEY_PRESSED, requestKeyPreview
//  -> request a note preview from audio server
// shared.actions.INITIALIZED, subscribeToPosition
//  -> Use fast event channel from server to dispatch position updates

// Overview
// initialized            -> client gets position subscription
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
// };
// All names in sequence data will be played during given slot
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
