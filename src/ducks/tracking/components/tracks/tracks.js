import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import { RulerContainer } from '../ruler/ruler-container';
import { Track } from '../track/track';
import './tracks.scss';

const { Icon } = shared.components;

const component = props => h('.tracks', {
  onClick: props.onTracksPress,
}, [
  h(RulerContainer),
  ...props.tracks.map(track => h(Track, {
    addSequence: props.addSequence,
    deselectSequence: props.deselectSequence,
    isMuted: _.includes(props.mutedTrackIds, track.id),
    isSoloing: _.includes(props.soloingTrackIds, track.id),
    openSequence: props.openSequence,
    onSequenceContextMenu: props.openContextMenu,
    onTrackSelect: props.onTrackSelect,
    selectedSequenceId: props.selectedSequenceId,
    selectSequence: props.selectSequence,
    toggleTrackIsMuted: props.toggleTrackIsMuted,
    toggleTrackIsSoloing: props.toggleTrackIsSoloing,
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
    h('.tracks__add-button__text', 'Add Track'),
  ]),
]);

const composed = compose(
  setDisplayName('Tracks'),
  pure,
  setPropTypes({
    addSequence: React.PropTypes.func.isRequired,
    addTrack: React.PropTypes.func.isRequired,
    deselectSequence: React.PropTypes.func.isRequired,
    mutedTrackIds: React.PropTypes.array.isRequired,
    soloingTrackIds: React.PropTypes.array.isRequired,
    openContextMenu: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    selectSequence: React.PropTypes.func.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    stageTrack: React.PropTypes.func.isRequired,
    toggleTrackIsMuted: React.PropTypes.func.isRequired,
    toggleTrackIsSoloing: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.array.isRequired,
  }),
  withHandlers({
    onTracksPress: props => (e) => {
      props.deselectSequence();
      e.stopPropagation();
    },
    onTrackSelect: props => (track) => {
      props.stageTrack(track.id);
    },
  }),
)(component);

export const Tracks = composed;
