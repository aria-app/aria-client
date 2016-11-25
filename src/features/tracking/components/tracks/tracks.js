import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { RulerContainer } from '../ruler/ruler-container';
import { Track } from '../track/track';
import './tracks.scss';

const { Icon } = shared.components;

export class Tracks extends React.Component {
  static propTypes = {
    addSequence: React.PropTypes.func.isRequired,
    addTrack: React.PropTypes.func.isRequired,
    deselectSequence: React.PropTypes.func.isRequired,
    mutedTrackIds: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ).isRequired,
    openContextMenu: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    soloingTrackIds: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ).isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    stageTrack: React.PropTypes.func.isRequired,
    toggleTrackIsMuted: React.PropTypes.func.isRequired,
    toggleTrackIsSoloing: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ).isRequired,
  }

  render() {
    return h('.tracks', {
      onClick: this.handleClick,
    }, [
      h(RulerContainer),
      ...this.props.tracks.map(track => h(Track, {
        addSequence: this.props.addSequence,
        deselectSequence: this.props.deselectSequence,
        isMuted: _.includes(this.props.mutedTrackIds, track.id),
        isSoloing: _.includes(this.props.soloingTrackIds, track.id),
        openSequence: this.props.openSequence,
        onSequenceContextMenu: this.props.openContextMenu,
        onTrackSelect: this.handleTrackSelect,
        selectedSequenceId: this.props.selectedSequenceId,
        selectSequence: this.props.selectSequence,
        toggleTrackIsMuted: this.props.toggleTrackIsMuted,
        toggleTrackIsSoloing: this.props.toggleTrackIsSoloing,
        songMeasureCount: this.props.songMeasureCount,
        track,
      })),
      h('.tracks__add-button', {
        style: {
          width: (this.props.songMeasureCount * 64) + 84,
        },
        onClick: this.props.addTrack,
      }, [
        h(Icon, {
          className: 'tracks__add-button__icon',
          icon: 'plus',
          size: 'large',
        }),
        h('.tracks__add-button__text', 'Add Track'),
      ]),
    ]);
  }

  handleClick = (e) => {
    this.props.deselectSequence();
    e.stopPropagation();
  }

  handleTrackSelect = (track) => {
    this.props.stageTrack(track.id);
  }
}
