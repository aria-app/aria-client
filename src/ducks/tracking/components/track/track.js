import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Sequence } from '../sequence/sequence';
import './track.scss';

const component = ({
  openSequence,
  onTrackPress,
  onTrackSelect,
  selectedSequenceId,
  selectSequence,
  songMeasureCount,
  track,
}) => h('.track', {
  onClick: onTrackPress,
}, [
  h('.track__header', {
    onClick: onTrackSelect,
  }, [
    track.synthType,
  ]),
  h('.track__sequences', {
    style: {
      width: songMeasureCount * 4 * 8 * 2,
    },
  }, [
    ...track.sequences.map(sequence => h(Sequence, {
      isSelected: sequence.id === selectedSequenceId,
      onSelect: selectSequence,
      openSequence,
      sequence,
    })),
  ]),
]);

const composed = compose([
  setDisplayName('Track'),
  pure,
  setPropTypes({
    deselectSequence: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    onTrackSelect: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    selectSequence: React.PropTypes.func.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    track: React.PropTypes.object.isRequired,
  }),
  withHandlers({
    selectSequence: (props) => (id) => {
      props.selectSequence(id);
    },
    onTrackSelect: (props) => () => {
      props.onTrackSelect(props.track);
    },
    onTrackPress: (props) => (e) => {
      props.deselectSequence();
      e.stopPropagation();
    },
  }),
])(component);

export const Track = composed;
