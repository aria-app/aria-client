import { includes } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { RulerContainer } from '../ruler/ruler-container';
import { Track } from '../track/track';
import './tracks.scss';

const { Icon } = shared.components;

export class Tracks extends React.Component {
  static propTypes = {
    mutedTrackIds: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ).isRequired,
    onSequenceAdd: React.PropTypes.func.isRequired,
    onSequenceContextMenu: React.PropTypes.func.isRequired,
    onSequenceDeselect: React.PropTypes.func.isRequired,
    onSequenceOpen: React.PropTypes.func.isRequired,
    onSequenceSelect: React.PropTypes.func.isRequired,
    onTrackAdd: React.PropTypes.func.isRequired,
    onTrackIsMutedToggle: React.PropTypes.func.isRequired,
    onTrackIsSoloingToggle: React.PropTypes.func.isRequired,
    onTrackStage: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    soloingTrackIds: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ).isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
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
        isMuted: this.getIsTrackMuted(track),
        isSoloing: this.getIsTrackSoloing(track),
        onSequenceAdd: this.props.onSequenceAdd,
        onSequenceContextMenu: this.props.onSequenceContextMenu,
        onSequenceOpen: this.props.onSequenceOpen,
        onSequenceSelect: this.props.onSequenceSelect,
        onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
        onTrackSelect: this.handleTrackSelect,
        selectedSequenceId: this.props.selectedSequenceId,
        songMeasureCount: this.props.songMeasureCount,
        track,
      })),
      h('.tracks__add-button', {
        style: this.getAddButtonStyle(),
        onClick: this.props.onTrackAdd,
      }, [
        h(Icon, {
          className: 'tracks__add-button__icon',
          icon: 'plus',
          size: 'large',
        }),
        h('.tracks__add-button__text', [
          'Add Track',
        ]),
      ]),
    ]);
  }

  getAddButtonStyle() {
    return {
      width: (this.props.songMeasureCount * 64) + 84,
    };
  }

  getIsTrackMuted(track) {
    return includes(track.id)(this.props.mutedTrackIds);
  }

  getIsTrackSoloing(track) {
    return includes(track.id)(this.props.soloingTrackIds);
  }

  handleClick = (e) => {
    this.props.onSequenceDeselect();
    e.stopPropagation();
  }

  handleTrackSelect = (trackId) => {
    this.props.onTrackStage(trackId);
  }
}
