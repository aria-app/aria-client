import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { Track } from '../track/track';
import './tracks.scss';

const component = ({
  onSelect,
  tracks,
}) => h('.tracks', [
  ...tracks.map(track => h(Track, {
    track,
    onSelect,
  })),
]);

const composed = compose([
  pure,
  setPropTypes({
    openSequence: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.array.isRequired,
  }),
  withHandlers({
    onSelect: (props) => (track) => {
      props.openSequence(track.sequences[0].id);
    },
  }),
])(component);

export const Tracks = composed;
