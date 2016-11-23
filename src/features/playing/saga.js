import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import Tone from 'tone';
import shared from '../shared';
import song from '../song';
import * as actions from './actions';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* addNewChannels({ tracks }) {
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    const channel = helpers.createChannel(track);
    yield put(actions.channelAdded(channel));
  }
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

function* previewNote({ payload }) {
  const { y } = payload;
  const sequence = yield select(song.selectors.getActiveSequence);
  const channel = yield select(selectors.getChannelById(sequence.trackId));
  const name = shared.helpers.getNoteName(y);
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
    takeEvery(actions.INSTRUMENT_DISPOSED, disposeInstruments),
    takeEvery(actions.NOTE_PLAYED, playNote),
    takeEvery(actions.NOTE_PREVIEWED, previewNote),
    takeEvery(actions.ALL_INSTRUMENTS_RELEASED, releaseAll),
    takeEvery(song.actions.TRACKS_ADDED, addNewChannels),
    takeEvery(song.actions.SONG_LOADED, initialize),
    takeEvery(song.actions.BPM_SET, setBPM),
    takeEvery(song.actions.TRACK_SYNTH_TYPE_SET, changeTrackInstrumentType),
    takeEvery(song.actions.TRACKS_SET, setChannels),
  ];
}

function setToneBPM(value) {
  Tone.Transport.bpm.value = value;
}
