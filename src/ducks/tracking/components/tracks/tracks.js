import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { Track } from '../track/track';
import './tracks.scss';

const component = ({
  onSequenceSelect,
  selectedSequenceIds,
  tracks,
}) => h('.tracks', [
  ...tracks.map(track => h(Track, {
    track,
    onSequenceSelect,
    selectedSequenceIds,
  })),
]);

const composed = compose([
  pure,
  setPropTypes({
    selectedSequenceIds: React.PropTypes.array.isRequired,
    setSelectedSequenceIds: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.array.isRequired,
  }),
  withHandlers({
    onSequenceSelect: (props) => (id) => {
      props.setSelectedSequenceIds([id]);
    },
  }),
])(component);

export const Tracks = composed;
