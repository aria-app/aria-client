import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { AddSequenceButton } from '../add-sequence-button/add-sequence-button';
import { Sequence } from '../sequence/sequence';
import { TrackHeader } from '../track-header/track-header';
import './track.scss';

export class Track extends React.PureComponent {
  static propTypes = {
    isMuted: PropTypes.bool.isRequired,
    isSoloing: PropTypes.bool.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackSelect: PropTypes.func.isRequired,
    selectedSequenceId: PropTypes.string,
    songMeasureCount: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    return h('.track', [
      h('.track__body', [
        h(TrackHeader, {
          isMuted: this.props.isMuted,
          isSoloing: this.props.isSoloing,
          onClick: this.handleHeaderClick,
          onIsMutedToggle: this.handleHeaderIsMutedToggle,
          onIsSoloingToggle: this.handleHeaderIsSoloingToggle,
          track: this.props.track,
        }),
        h('.track__body__sequences', {
          style: this.getBodySequencesStyle(),
        }, [
          ...this.props.track.sequences.map(sequence =>
            h(Sequence, {
              onOpen: this.props.onSequenceOpen,
              onSelect: this.props.onSequenceSelect,
              selectedSequenceId: this.props.selectedSequenceId,
              sequence,
            }),
          ),
          h(AddSequenceButton, {
            onClick: this.handleAddSequenceButtonClick,
            track: this.props.track,
          }),
        ]),
      ]),
    ]);
  }

  getBodySequencesStyle = () => ({
    width: this.props.songMeasureCount * 64,
  });

  handleAddSequenceButtonClick = (position) => {
    this.props.onSequenceAdd(
      this.props.track,
      position,
    );
  }

  handleBodySequencesSequenceOpen = (sequence) => {
    this.props.onSequenceOpen(sequence);
  }

  handleBodySequencesSequenceSelect = (sequence) => {
    this.props.onSequenceSelect(sequence);
  }

  handleHeaderClick = () => {
    this.props.onTrackSelect(this.props.track);
  }

  handleHeaderIsMutedToggle = () => {
    this.props.onTrackIsMutedToggle(this.props.track);
  }

  handleHeaderIsSoloingToggle = () => {
    this.props.onTrackIsSoloingToggle(this.props.track);
  }
}
