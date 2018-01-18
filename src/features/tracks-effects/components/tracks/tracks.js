import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { AddTrackButton } from '../add-track-button/add-track-button';
import { Track } from '../track/track';
import './tracks.scss';

const { Ruler } = shared.components;

export class Tracks extends React.PureComponent {
  static propTypes = {
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceDeselect: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onSongExtend: PropTypes.func.isRequired,
    onSongShorten: PropTypes.func.isRequired,
    onTrackAdd: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackStage: PropTypes.func.isRequired,
    selectedSequenceId: PropTypes.string,
    songMeasureCount: PropTypes.number.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return h('.tracks', {
      onClick: this.handleClick,
    }, [
      h(Ruler, {
        measureCount: this.props.songMeasureCount,
        measureWidth: 64,
        onPause: () => {},
        onPlay: () => {},
        onPositionSet: () => {},
        onSongExtend: this.props.onSongExtend,
        onSongShorten: this.props.onSongShorten,
        playbackState: 'stopped',
      }),
      ...this.props.tracks.map(track =>
        h(Track, {
          onSequenceAdd: this.props.onSequenceAdd,
          onSequenceOpen: this.props.onSequenceOpen,
          onSequenceSelect: this.props.onSequenceSelect,
          onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
          onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
          onTrackSelect: this.props.onTrackStage,
          selectedSequenceId: this.props.selectedSequenceId,
          songMeasureCount: this.props.songMeasureCount,
          track,
        }),
      ),
      h(AddTrackButton, {
        onClick: this.props.onTrackAdd,
        songMeasureCount: this.props.songMeasureCount,
      }),
    ]);
  }

  handleClick = (e) => {
    e.stopPropagation();

    if (!this.props.selectedSequenceId) return;

    this.props.onSequenceDeselect();
  }
}
