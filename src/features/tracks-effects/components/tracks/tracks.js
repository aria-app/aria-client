import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Track } from '../track/track';
import './tracks.scss';

const { Icon, Ruler } = shared.components;

export class Tracks extends React.PureComponent {
  static propTypes = {
    mutedTrackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    soloingTrackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return h('.tracks', {
      onClick: this.handleClick,
    }, [
      h(Ruler, {
        measureCount: this.props.songMeasureCount,
        onPause: () => {},
        onPlay: () => {},
        onPositionSet: () => {},
        onSongExtend: this.props.onSongExtend,
        onSongShorten: this.props.onSongShorten,
        playbackState: 'stopped',
      }),
      ...this.props.tracks.map(track =>
        h(Track, {
          mutedTrackIds: this.props.mutedTrackIds,
          onSequenceAdd: this.props.onSequenceAdd,
          onSequenceOpen: this.props.onSequenceOpen,
          onSequenceSelect: this.props.onSequenceSelect,
          onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
          onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
          onTrackSelect: this.props.onTrackStage,
          selectedSequenceId: this.props.selectedSequenceId,
          soloingTrackIds: this.props.soloingTrackIds,
          songMeasureCount: this.props.songMeasureCount,
          track,
        }),
      ),
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

  getAddButtonStyle = () => ({
    width: (this.props.songMeasureCount * 64) + 84,
  });

  handleClick = (e) => {
    e.stopPropagation();

    if (!this.props.selectedSequenceId) return;

    this.props.onSequenceDeselect();
  }
}
