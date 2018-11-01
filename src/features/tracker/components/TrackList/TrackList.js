import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { AddTrackButton } from '../AddTrackButton/AddTrackButton';
import { Ruler } from '../Ruler/Ruler';
import { Track } from '../Track/Track';
import './TrackList.scss';


export class TrackList extends React.PureComponent {
  static propTypes = {
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceDeselect: PropTypes.func.isRequired,
    onSequenceEdit: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onSongExtend: PropTypes.func.isRequired,
    onSongShorten: PropTypes.func.isRequired,
    onTrackAdd: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackStage: PropTypes.func.isRequired,
    selectedSequence: PropTypes.object,
    songMeasureCount: PropTypes.number.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return h('.track-list', {
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
      h('.track-list__tracks', [
        ...this.props.tracks.map((track, index) =>
          h(Track, {
            key: `track-${index}`,
            onSequenceAdd: this.props.onSequenceAdd,
            onSequenceEdit: this.props.onSequenceEdit,
            onSequenceOpen: this.props.onSequenceOpen,
            onSequenceSelect: this.props.onSequenceSelect,
            onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
            onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
            onTrackSelect: this.props.onTrackStage,
            selectedSequence: this.props.selectedSequence,
            songMeasureCount: this.props.songMeasureCount,
            index,
            track,
          }),
        ),
      ]),
      h(AddTrackButton, {
        onClick: this.props.onTrackAdd,
        songMeasureCount: this.props.songMeasureCount,
      }),
    ]);
  }

  handleClick = (e) => {
    e.stopPropagation();

    if (isEmpty(this.props.selectedSequence)) return;

    this.props.onSequenceDeselect();
  }
}
