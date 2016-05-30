import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { Sequence } from '../sequence/sequence';
import './track.scss';

const component = ({
  onSequenceSelect,
  track,
}) => h('.track', [
  h('.track__header', [
    track.synthType,
  ]),
  h('.track__sequences', [
    ...track.sequences.map(sequence => h(Sequence, {
      isSelected: false,
      onSelect: onSequenceSelect,
      sequence,
    })),
  ]),
]);

const composed = compose([
  pure,
  setPropTypes({
    onSequenceSelect: React.PropTypes.func.isRequired,
    selectedSequenceIds: React.PropTypes.array.isRequired,
    track: React.PropTypes.object.isRequired,
  }),
  withHandlers({
    onSequenceSelect: (props) => (id) => {
      props.onSequenceSelect(id);
    },
  }),
])(component);

export const Track = composed;
