import includes from 'lodash/fp/includes';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { AddSequenceButton } from '../add-sequence-button/add-sequence-button';
import { Sequence } from '../sequence/sequence';
import './track.scss';

export class Track extends React.PureComponent {
  static propTypes = {
    mutedTrackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackSelect: PropTypes.func.isRequired,
    selectedSequenceId: PropTypes.string,
    soloingTrackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    return h('.track', [
      h('.track__body', [
        h('.track__body__header', {
          onClick: this.handleBodyHeaderClick,
        }, [
          h('.track__body__header__title', [
            this.props.track.voice,
          ]),
          h('.track__body__header__actions', [
            h('.track__body__header__actions__action.track__body__header__actions__action--mute', {
              className: this.getBodyHeaderActionsActionMuteClassName(),
              onClick: this.handleBodyHeaderActionsActionMuteClick,
            }, ['M']),
            h('.track__body__header__actions__action.track__body__header__actions__action--solo', {
              className: this.getBodyHeaderActionsActionSoloClassName(),
              onClick: this.handleBodyHeaderActionsActionSoloClick,
            }, ['S']),
          ]),
        ]),
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
            onClick: this.handleBodySequencesAddButtonClick,
            track: this.props.track,
          }),
        ]),
      ]),
    ]);
  }

  getBodyHeaderActionsActionMuteClassName() {
    return classnames({
      'track__body__header__actions__action--active': this.getIsMuted(),
    });
  }

  getBodyHeaderActionsActionSoloClassName() {
    return classnames({
      'track__body__header__actions__action--active': this.getIsSoloing(),
    });
  }

  getBodySequencesStyle() {
    return {
      width: this.props.songMeasureCount * 64,
    };
  }

  getIsMuted = () =>
    includes(this.props.track.id, this.props.mutedTrackIds);

  getIsSoloing = () =>
    includes(this.props.track.id, this.props.soloingTrackIds);

  handleBodyHeaderClick = () => {
    this.props.onTrackSelect(this.props.track);
  }

  handleBodyHeaderActionsActionMuteClick = (e) => {
    e.stopPropagation();
    this.props.onTrackIsMutedToggle(this.props.track);
  }

  handleBodyHeaderActionsActionSoloClick = (e) => {
    e.stopPropagation();
    this.props.onTrackIsSoloingToggle(this.props.track);
  }

  handleBodySequencesAddButtonClick = () => {
    this.props.onSequenceAdd(
      this.props.track,
      this.getAddPosition(),
    );
  }

  handleBodySequencesSequenceOpen = (sequence) => {
    this.props.onSequenceOpen(sequence);
  }

  handleBodySequencesSequenceSelect = (sequence) => {
    this.props.onSequenceSelect(sequence);
  }
}
