import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';


function* addNewChannel(action) {
  const channel = helpers.createChannel(action.track);
  yield put(actions.addChannel(channel));
  yield put(transport.effects.updateSequences());
}

function* disposeSynths(channel) {
  yield call(() => {
    channel.activeSynths.forEach(s => s.dispose());
    channel.previewSynth.dispose();
    channel.synths.forEach(s => s.dispose());
  });
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

function* receiveTrackUpdate(action) {
  const channelForTrack = yield select(selectors.getChannelById(action.track.id));
  yield disposeSynths(channelForTrack);
  yield put(actions.updateChannel(helpers.createChannel(action.track)));
}

function* setChannels(action) {
  const channels = action.tracks.map(helpers.createChannel);
  yield put(actions.setChannels(channels));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.RELEASE_ALL, releaseAll),
    takeEvery(song.actionTypes.ADD_NEW_TRACK, addNewChannel),
    takeEvery(song.actionTypes.UPDATE_TRACK, receiveTrackUpdate),
    takeEvery(song.actionTypes.SET_TRACKS, setChannels),
  ];
}
