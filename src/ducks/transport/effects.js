import _ from 'lodash';
import Tone from 'tone';
import song from 'ducks/song';
import * as actions from './actions';
import * as helpers from './helpers';

export function createSequences() {
  return (dispatch, getState) => {
    const songSequences = song.selectors.getSequences(getState());
    const sequences = songSequences.map(sequence => createSequence(
      sequence,
      (time, step) => dispatch(actions.sequenceStep({ sequence, step, time })),
      _.range(sequence.measureCount * 32),
      '32n'
    ));

    dispatch(actions.setSequences(sequences));
  };
}

export function createSongSequence() {
  return (dispatch, getState) => {
    const measureCount = song.selectors.getMeasureCount(getState());
    const sequence = new Tone.Sequence(
      (time, step) => dispatch(actions.songSequenceStep({ step, time })),
      _.range(measureCount * 32),
      '32n',
    );
    sequence.loop = false;
    sequence.start('0');
    dispatch(actions.setSongSequence(sequence));
  };
}

function createSequence(songSequence, ...rest) {
  const sequence = new Tone.Sequence(...rest);
  const start = helpers.measuresToSeconds(songSequence.position);
  sequence.loop = false;
  sequence.start(start);
  return sequence;
}
