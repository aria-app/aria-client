import PropTypes from 'prop-types';
import React from 'react';
import { AddTrackButton } from '../AddTrackButton/AddTrackButton';
import { Ruler } from '../Ruler/Ruler';
import { Track } from '../Track/Track';
import './TrackList.scss';


export class TrackList extends React.PureComponent {
  static propTypes = {
    isStopped: PropTypes.bool.isRequired,
    onPositionSet: PropTypes.func.isRequired,
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
    return (
      <div
        className="track-list"
        onClick={this.handleClick}>
        <Ruler
          isStopped={this.props.isStopped}
          measureCount={this.props.songMeasureCount}
          measureWidth={64}
          onPositionSet={this.props.onPositionSet}
        />
        <div
          className="track-list__tracks">
          {this.props.tracks.map((track, index) => (
            <Track
              key={`track-${index}`}
              onSequenceAdd={this.props.onSequenceAdd}
              onSequenceDeselect={this.props.onSequenceDeselect}
              onSequenceEdit={this.props.onSequenceEdit}
              onSequenceOpen={this.props.onSequenceOpen}
              onSequenceSelect={this.props.onSequenceSelect}
              onTrackIsMutedToggle={this.props.onTrackIsMutedToggle}
              onTrackIsSoloingToggle={this.props.onTrackIsSoloingToggle}
              onTrackSelect={this.props.onTrackStage}
              selectedSequence={this.props.selectedSequence}
              songMeasureCount={this.props.songMeasureCount}
              index={index}
              track={track}
            />
          ))}
        </div>
        <AddTrackButton
          onClick={this.props.onTrackAdd}
          songMeasureCount={this.props.songMeasureCount}
        />
      </div>
    );
  }
}
