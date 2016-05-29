import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import './track.scss';

const component = ({
  onSequenceSelect,
  track,
}) => h('.track', [
  ...track.sequences.map(s => h('.sequence', {
    onClick: () => onSequenceSelect(s.id),
  }, [
    `${track.synthType} ${s.notes.length}`,
  ])),
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
