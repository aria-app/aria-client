import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { AddSequenceButton } from '../AddSequenceButton/AddSequenceButton';
import { TrackSequence } from '../TrackSequence/TrackSequence';
import { TrackHeader } from '../TrackHeader/TrackHeader';
import './Track.scss';

export class Track extends React.PureComponent {
  static propTypes = {
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackSelect: PropTypes.func.isRequired,
    selectedSequence: PropTypes.object,
    songMeasureCount: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    return h('.track', [
      h('.track__body', [
        h(TrackHeader, {
          isMuted: getOr(false, 'props.track.isMuted', this),
          isSoloing: getOr(false, 'props.track.isSoloing', this),
          onClick: this.handleHeaderClick,
          onIsMutedToggle: this.handleHeaderIsMutedToggle,
          onIsSoloingToggle: this.handleHeaderIsSoloingToggle,
          track: this.props.track,
        }),
        h('.track__body__sequences', {
          style: this.getBodySequencesStyle(),
        }, [
          ...this.props.track.sequences.map(sequence =>
            h(TrackSequence, {
              onOpen: this.props.onSequenceOpen,
              onSelect: this.props.onSequenceSelect,
              selectedSequence: this.props.selectedSequence,
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
