import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import Tone from 'tone';
import song from '../song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* addNewChannel({ track }) {
  const channel = helpers.createChannel(track);
  yield put(actions.channelAdded(channel));
}

function* changeTrackInstrumentType({ synthType, id }) {
  const channel = yield select(selectors.getChannelById(id));

  if (channel.instrument.getType() !== synthType) {
    channel.instrument.setType(synthType);
  }
}

function* disposeInstruments({ channel }) {
  yield call(channel.instrument.dispose.bind(channel.instrument));
}

function* initialize(action) {
  const tracks = yield select(song.selectors.getTracks);

  yield setChannels({ tracks });

  yield setBPM({ bpm: action.song.bpm });
}

function* playNote({ payload }) {
  const { channelId, note, time } = payload;
  const channel = yield select(selectors.getChannelById(channelId));

  channel.instrument.playNote(note, time);
}

function* previewNote({ name }) {
  const sequence = yield select(song.selectors.getActiveSequence);
  const channel = yield select(selectors.getChannelById(sequence.trackId));
  channel.instrument.previewNote(name);
}

function* releaseAll() {
  const channels = yield select(selectors.getChannels);

  for (let i = 0; i < channels.length; i++) {
    const channel = channels[i];
    channel.instrument.release();
  }
}

function* setBPM({ bpm }) {
  yield call(setToneBPM, bpm);
}

function* setChannels({ tracks }) {
  const previousChannels = yield select(selectors.getChannels);

  for (let i = 0; i < previousChannels.length; i++) {
    yield put(actions.instrumentDisposed(previousChannels[i]));
  }

  const channels = tracks.map(helpers.createChannel);

  yield put(actions.channelsSet(channels));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.INSTRUMENT_DISPOSED, disposeInstruments),
    takeEvery(actionTypes.NOTE_PLAYED, playNote),
    takeEvery(actionTypes.NOTE_PREVIEWED, previewNote),
    takeEvery(actionTypes.ALL_INSTRUMENTS_RELEASED, releaseAll),
    takeEvery(song.actionTypes.TRACK_CREATED_AND_ADDED, addNewChannel),
    takeEvery(song.actionTypes.SONG_LOADED, initialize),
    takeEvery(song.actionTypes.BPM_SET, setBPM),
    takeEvery(song.actionTypes.TRACK_SYNTH_TYPE_SET, changeTrackInstrumentType),
    takeEvery(song.actionTypes.TRACKS_SET, setChannels),
  ];
}

function setToneBPM(value) {
  Tone.Transport.bpm.value = value;
}
