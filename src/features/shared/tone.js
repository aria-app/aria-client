/* eslint-disable global-require */
import { isUndefined } from 'lodash/fp';

const isWebAudioSupported = !isUndefined(window) && !isUndefined(window.AudioContext);
let Tone;

if (isWebAudioSupported) {
  Tone = require('tone');
}

export default {
  createSequence,
  createSynth,
  getTransportState,
  getTransportTime,
  pauseTransport,
  scheduleOnceOnTransport,
  setTransportBPM,
  setTransportLoop,
  setTransportLoopPoints,
  setTransportPosition,
  startTransport,
  stopTransport,
};

function createSequence(...args) {
  if (!isWebAudioSupported) return {};
  return new Tone.Sequence(...args);
}

const mockSynth = {
  oscillator: {
    type: 'square',
  },
  toMaster: () => mockSynth,
};

function createSynth(...args) {
  if (!isWebAudioSupported) return mockSynth;
  return new Tone.Synth(...args);
}

function getTransportState() {
  if (!isWebAudioSupported) return 'stopped';
  return Tone.Transport.state;
}

function getTransportTime(...args) {
  if (!isWebAudioSupported) return '';
  return new Tone.TransportTime(...args).toBarsBeatsSixteenths();
}

function pauseTransport(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.pause(...args);
}

function scheduleOnceOnTransport(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.scheduleOnce(...args);
}

function setTransportBPM(value) {
  if (!isWebAudioSupported) return;
  Tone.Transport.bpm.value = value;
}

function setTransportLoop(value) {
  if (!isWebAudioSupported) return;
  Tone.Transport.loop = value;
}

function setTransportLoopPoints(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.setLoopPoints(...args);
}

function setTransportPosition(position) {
  if (!isWebAudioSupported) return;
  Tone.Transport.position = position;
}

function startTransport(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.start(...args);
}

function stopTransport(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.stop(...args);
}
