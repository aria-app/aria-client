import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { AddTrackButton } from '../AddTrackButton/AddTrackButton';
import { Ruler } from '../Ruler/Ruler';
import { Track } from '../Track/Track';

const StyledTrackList = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: auto;
  padding: ${props => props.theme.margin.m}px;
  padding-bottom: ${props => props.theme.margin.m + 2}px;
  padding-top: ${props => props.theme.margin.m + 2}px;
  position: relative;
`;

const TrackListUnderlay = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

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
      <StyledTrackList
        onClick={this.handleClick}>
        <TrackListUnderlay
          onClick={this.props.onSequenceDeselect}
        />
        <Ruler
          isStopped={this.props.isStopped}
          measureCount={this.props.songMeasureCount}
          measureWidth={64}
          onPositionSet={this.props.onPositionSet}
        />
        {this.props.tracks.map((track, index) => (
          <Track
            key={`track-${index}`}
            onSequenceAdd={this.props.onSequenceAdd}
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
        <AddTrackButton
          onClick={this.props.onTrackAdd}
          songMeasureCount={this.props.songMeasureCount}
        />
      </StyledTrackList>
    );
  }
}
