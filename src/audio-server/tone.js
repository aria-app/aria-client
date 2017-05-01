/* eslint-disable global-require */
import { isUndefined } from 'lodash/fp';

const isWebAudioSupported = !isUndefined(window) && !isUndefined(window.AudioContext);
let Tone;

if (isWebAudioSupported) {
  Tone = require('tone');
}

export default {
  createPart,
  createSynth,
  getTransportState,
  getTransportTime,
  onPause,
  onStart,
  onStop,
  pauseTransport,
  scheduleOnceOnTransport,
  setTransportBPM,
  setTransportLoop,
  setTransportLoopPoints,
  setTransportPosition,
  startTransport,
  stopTransport,
};

function createPart(...args) {
  if (!isWebAudioSupported) return {};
  return new Tone.Sequence(...args);
}

const mockSynth = {
  oscillator: {
    type: 'square',
  },
  toMaster: () => mockSynth,
};

function createSynth(options) {
  if (!isWebAudioSupported) return mockSynth;
  const synth = new Tone.PolySynth(5);
  synth.set(options);
  return synth;
}

function getTransportState() {
  if (!isWebAudioSupported) return 'stopped';
  return Tone.Transport.state;
}

function getTransportTime(...args) {
  if (!isWebAudioSupported) return '';
  return new Tone.TransportTime(...args).toBarsBeatsSixteenths();
}

function onPause(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.on('pause', ...args);
}

function onStart(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.on('start', ...args);
}

function onStop(...args) {
  if (!isWebAudioSupported) return;
  Tone.Transport.on('stop', ...args);
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
