import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Track } from '../track/track';
import './tracks.scss';

const component = ({
  onSequenceSelect,
  onTracksPress,
  selectedSequenceId,
  songMeasureCount,
  tracks,
}) => h('.tracks', {
  onClick: onTracksPress,
}, [
  ...tracks.map(track => h(Track, {
    track,
    onSequenceSelect,
    selectedSequenceId,
    songMeasureCount,
  })),
]);

const composed = compose([
  setDisplayName('Tracks'),
  pure,
  setPropTypes({
    selectedSequenceId: React.PropTypes.number.isRequired,
    setSelectedSequenceId: React.PropTypes.func.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    tracks: React.PropTypes.array.isRequired,
  }),
  withHandlers({
    onSequenceSelect: (props) => (id) => {
      props.setSelectedSequenceId(id);
    },
    onTracksPress: (props) => (e) => {
      props.setSelectedSequenceId(-1);
      e.stopPropagation();
    },
  }),
])(component);

export const Tracks = composed;
