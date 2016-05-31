import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Sequence } from '../sequence/sequence';
import './track.scss';

const component = ({
  onSequenceSelect,
  onTrackPress,
  selectedSequenceId,
  songMeasureCount,
  track,
}) => h('.track', {
  onClick: onTrackPress,
}, [
  h('.track__header', [
    track.synthType,
  ]),
  h('.track__sequences', {
    style: {
      width: songMeasureCount * 4 * 8 * 2,
    },
  }, [
    ...track.sequences.map(sequence => h(Sequence, {
      isSelected: sequence.id === selectedSequenceId,
      onSelect: onSequenceSelect,
      sequence,
    })),
  ]),
]);

const composed = compose([
  setDisplayName('Track'),
  pure,
  setPropTypes({
    onSequenceSelect: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.number.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    track: React.PropTypes.object.isRequired,
  }),
  withHandlers({
    onSequenceSelect: (props) => (id) => {
      props.onSequenceSelect(id);
    },
    onTrackPress: (props) => (e) => {
      props.onSequenceSelect(-1);
      e.stopPropagation();
    },
  }),
])(component);

export const Track = composed;
