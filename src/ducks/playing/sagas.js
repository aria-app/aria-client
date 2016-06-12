import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import Tone from 'tone';
import shared from 'ducks/shared';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';


function* addNewChannel(action) {
  const channel = helpers.createChannel(action.track);
  yield put(actions.addChannel(channel));
  yield put(transport.actions.updateSequences());
}

function* disposeSynths(channel) {
  yield call(() => {
    channel.activeSynths.forEach(s => s.dispose());
    channel.previewSynth.dispose();
    channel.synths.forEach(s => s.dispose());
  });
}

function* initialize(action) {
  yield setBPM({
    bpm: action.song.bpm,
  });
  yield setChannels({
    tracks: action.song.tracks.ids
      .map(id => action.song.tracks.dict[id]),
  });
}

function* playNote(action) {
  const { channelId, note, time } = action.payload;
  const channel = yield select(selectors.getChannelById(channelId));
  const synth = _.last(channel.synths);

  yield put(actions.popSynth(synth, channelId));

  const playNoteInner = () => new Promise(resolve => {
    if (!synth) {
      // eslint-disable-next-line no-console
      console.log(`Channel ${channelId} synths unavailable`);
      return;
    }

    const name = shared.helpers.getNoteName(_.first(note.points).y);
    const length = helpers.sizeToSeconds(_.last(note.points).x - _.first(note.points).x);

    synth.triggerAttack(name, time);

    if (_.last(note.points).y !== _.first(note.points).y) {
      const endName = shared.helpers.getNoteName(_.last(note.points).y);
      synth.frequency.linearRampToValueAtTime(endName, `+${length}`);
      synth.frequency.setValueAtTime(endName, `+${length}`);
    }

    Tone.Transport.scheduleOnce(() => {
      if (synth && synth.envelope) synth.triggerRelease();
      resolve();
    }, `+(${length} - 0:0:0.1)`);
  });

  yield call(playNoteInner);
  yield put(actions.pushSynth(synth, channelId));
}

function* popSynth(action) {
  const channel = yield select(selectors.getChannelById(action.channelId));

  yield put(actions.updateChannel({
    ...channel,
    activeSynths: _.concat(channel.activeSynths, action.synth),
    synths: _.without(channel.synths, action.synth),
  }));
}

function* previewNote(action) {
  const sequence = yield select(song.selectors.getActiveSequence);
  const previewSynth = yield select(selectors.getPreviewSynthByChannelId(sequence.trackId));
  previewSynth.triggerAttackRelease(action.name, '16n');
}

function* pushSynth(action) {
  const channel = yield select(selectors.getChannelById(action.channelId));

  if (!_.includes(channel.activeSynths, action.synth)) return;

  yield put(actions.updateChannel({
    ...channel,
    activeSynths: _.without(channel.activeSynths, action.synth),
    synths: _.concat(channel.synths, action.synth),
  }));
}

function* receiveTrackUpdate(action) {
  const channelForTrack = yield select(selectors.getChannelById(action.track.id));
  yield disposeSynths(channelForTrack);
  yield put(actions.updateChannel(helpers.createChannel(action.track)));
}

function* releaseAll() {
  const channels = yield select(selectors.getChannels);

  yield call(() => {
    channels.forEach(channel => {
      channel.activeSynths.forEach(s => {
        s.triggerRelease();
      });
    });
  });

  yield put(actions.updateChannels(channels.map(channel => ({
    ...channel,
    activeSynths: [],
    synths: [
      ...channel.synths,
      ...channel.activeSynths,
    ],
  }))));
}

function* setBPM(action) {
  yield call(() => {
    Tone.Transport.bpm.value = action.bpm;
  });
}

function* setChannels(action) {
  const channels = action.tracks.map(helpers.createChannel);
  yield put(actions.setChannels(channels));
}

export default function* saga() {
  yield [
    takeEvery(song.actionTypes.ADD_NEW_TRACK, addNewChannel),
    takeEvery(actionTypes.PLAY_NOTE, playNote),
    takeEvery(actionTypes.POP_SYNTH, popSynth),
    takeEvery(actionTypes.PREVIEW_NOTE, previewNote),
    takeEvery(actionTypes.PUSH_SYNTH, pushSynth),
    takeEvery(actionTypes.RELEASE_ALL, releaseAll),
    takeEvery(song.actionTypes.SET_BPM, setBPM),
    takeEvery(song.actionTypes.LOAD_SONG, initialize),
    takeEvery(song.actionTypes.SET_TRACKS, setChannels),
    takeEvery(song.actionTypes.UPDATE_TRACK, receiveTrackUpdate),
  ];
}
