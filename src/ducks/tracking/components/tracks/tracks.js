import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Track } from '../track/track';
import './tracks.scss';

const component = ({
  deselectSequence,
  openSequence,
  onTrackSelect,
  onTracksPress,
  selectedSequenceId,
  selectSequence,
  songMeasureCount,
  tracks,
}) => h('.tracks', {
  onClick: onTracksPress,
}, [
  ...tracks.map(track => h(Track, {
    deselectSequence,
    openSequence,
    onTrackSelect,
    selectedSequenceId,
    selectSequence,
    songMeasureCount,
    track,
  })),
]);

const composed = compose([
  setDisplayName('Tracks'),
  pure,
  setPropTypes({
    deselectSequence: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    selectSequence: React.PropTypes.func.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    stageTrack: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.array.isRequired,
  }),
  withHandlers({
    onTrackSelect: (props) => (track) => {
      props.stageTrack(track);
    },
    onTracksPress: (props) => (e) => {
      props.deselectSequence();
      e.stopPropagation();
    },
  }),
])(component);

export const Tracks = composed;
