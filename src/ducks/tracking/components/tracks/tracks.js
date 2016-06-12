import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { RulerContainer } from '../ruler-container/ruler-container';
import { Track } from '../track/track';
import './tracks.scss';

const { Icon } = shared.components;

const component = (props) => h('.tracks', {
  onClick: props.onTracksPress,
}, [
  h(RulerContainer),
  ...props.tracks.map(track => h(Track, {
    deselectSequence: props.deselectSequence,
    openSequence: props.openSequence,
    onTrackSelect: props.onTrackSelect,
    selectedSequenceId: props.selectedSequenceId,
    selectSequence: props.selectSequence,
    songMeasureCount: props.songMeasureCount,
    track,
  })),
  h('.tracks__add-button', {
    style: {
      width: props.songMeasureCount * 64 + 84,
    },
    onClick: props.addTrack,
  }, [
    h(Icon, {
      className: 'tracks__add-button__icon',
      icon: 'plus',
      size: 'large',
    }),
    h('.tracks__add-button__text', 'Add New Track'),
  ]),
]);

const composed = compose([
  setDisplayName('Tracks'),
  pure,
  setPropTypes({
    addTrack: React.PropTypes.func.isRequired,
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
