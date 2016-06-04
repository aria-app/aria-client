import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Track } from '../track/track';
import './tracks.scss';

const component = ({
  editSequence,
  onSequenceSelect,
  onTrackSelect,
  onTracksPress,
  selectedSequenceId,
  songMeasureCount,
  tracks,
}) => h('.tracks', {
  onClick: onTracksPress,
}, [
  ...tracks.map(track => h(Track, {
    editSequence,
    onSequenceSelect,
    onTrackSelect,
    selectedSequenceId,
    songMeasureCount,
    track,
  })),
]);

const composed = compose([
  setDisplayName('Tracks'),
  pure,
  setPropTypes({
    editSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    setSelectedSequenceId: React.PropTypes.func.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    stageTrackForEditing: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.array.isRequired,
  }),
  withHandlers({
    onSequenceSelect: (props) => (id) => {
      props.setSelectedSequenceId(id);
    },
    onTrackSelect: (props) => (trackId) => {
      props.stageTrackForEditing(trackId);
    },
    onTracksPress: (props) => (e) => {
      props.setSelectedSequenceId('');
      e.stopPropagation();
    },
  }),
])(component);

export const Tracks = composed;
