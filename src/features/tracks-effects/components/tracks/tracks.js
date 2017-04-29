import { includes } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import song from '../../../song';
import { RulerContainer } from '../ruler/ruler-container';
import { Track } from '../track/track';
import './tracks.scss';

const { Icon } = shared.components;
const { createSequence } = song.helpers;

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
        onSequenceAdd: this.handleTrackSequenceAdd,
        onSequenceContextMenu: this.props.onSequenceContextMenu,
        onSequenceOpen: this.handleTrackSequenceOpen,
        onSequenceSelect: this.handleTrackSequenceSelect,
        onTrackIsMutedToggle: this.handleTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.handleTrackIsSoloingToggle,
        onTrackSelect: this.handleTrackSelect,
        selectedSequenceId: this.props.selectedSequenceId,
        songMeasureCount: this.props.songMeasureCount,
        track,
      })),
      h('.tracks__add-button', {
        style: this.getAddButtonStyle(),
        onClick: this.handleAddButtonClick,
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
    return includes(track)(this.props.mutedTrackIds);
  }

  getIsTrackSoloing(track) {
    return includes(track)(this.props.soloingTrackIds);
  }

  handleAddButtonClick = () => {
    const track = song.helpers.createTrack();
    this.props.onTrackAdd({
      sequence: createSequence({
        trackId: track.id,
      }),
      track,
    });
  }

  handleClick = (e) => {
    e.stopPropagation();

    if (!this.props.selectedSequenceId) return;

    this.props.onSequenceDeselect();
  }

  handleTrackIsMutedToggle = track =>
    this.props.onTrackIsMutedToggle({
      track,
    });

  handleTrackIsSoloingToggle = track =>
    this.props.onTrackIsSoloingToggle({
      track,
    });

  handleTrackSelect = (trackId) => {
    this.props.onTrackStage({
      trackId,
    });
  }

  handleTrackSequenceAdd = (track, position) =>
    this.props.onSequenceAdd({
      sequence: createSequence({
        trackId: track.id,
        position,
      }),
    });

  handleTrackSequenceOpen = sequence =>
    this.props.onSequenceOpen({
      sequence,
    });

  handleTrackSequenceSelect = sequence =>
    this.props.onSequenceSelect({
      sequence,
    });
}
