import { max } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import shared from '../../../shared';
import { Sequence } from '../sequence/sequence';
import './track.scss';

const { Icon } = shared.components;

export class Track extends React.Component {
  static propTypes = {
    isMuted: React.PropTypes.bool.isRequired,
    isSoloing: React.PropTypes.bool.isRequired,
    onSequenceAdd: React.PropTypes.func.isRequired,
    onSequenceContextMenu: React.PropTypes.func.isRequired,
    onSequenceOpen: React.PropTypes.func.isRequired,
    onSequenceSelect: React.PropTypes.func.isRequired,
    onTrackIsMutedToggle: React.PropTypes.func.isRequired,
    onTrackIsSoloingToggle: React.PropTypes.func.isRequired,
    onTrackSelect: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    songMeasureCount: React.PropTypes.number.isRequired,
    track: React.PropTypes.object.isRequired,
  }

  render() {
    return h('.track', [
      h('.track__body', [
        h('.track__body__header', {
          onClick: this.handleBodyHeaderClick,
        }, [
          h('.track__body__header__title', [
            this.props.track.synthType,
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
          ...this.props.track.sequences.map(sequence => h(Sequence, {
            isSelected: this.getIsSequenceSelected(sequence),
            onContextMenu: this.props.onSequenceContextMenu,
            onOpen: this.handleBodySequencesSequenceOpen,
            onSelect: this.handleBodySequencesSequenceSelect,
            sequence,
          })),
          h('.track__body__sequences__add-button', {
            onClick: this.handleBodySequencesAddButtonClick,
            style: this.getBodySequencesAddButtonStyle(),
          }, [
            h(Icon, {
              className: 'track__body__sequences__add-button__icon',
              icon: 'plus',
              size: 'large',
            }),
          ]),
        ]),
      ]),
    ]);
  }

  getAddPosition() {
    return max(this.props.track.sequences.map(s => s.position + s.measureCount)) || 0;
  }

  getBodyHeaderActionsActionMuteClassName() {
    return classnames({
      'track__body__header__actions__action--active': this.props.isMuted,
    });
  }

  getBodyHeaderActionsActionSoloClassName() {
    return classnames({
      'track__body__header__actions__action--active': this.props.isSoloing,
    });
  }

  getBodySequencesStyle() {
    return {
      width: this.props.songMeasureCount * 64,
    };
  }

  getBodySequencesAddButtonStyle() {
    return {
      transform: `translateX(${this.getAddPosition() * 64}px)`,
    };
  }

  getIsSequenceSelected(sequence) {
    return sequence.id === this.props.selectedSequenceId;
  }

  handleBodyHeaderClick = () => {
    this.props.onTrackSelect(this.props.track);
  }

  handleBodyHeaderActionsActionMuteClick = (e) => {
    this.props.onTrackIsMutedToggle(this.props.track);
    e.stopPropagation();
  }

  handleBodyHeaderActionsActionSoloClick = (e) => {
    this.props.onTrackIsSoloingToggle(this.props.track);
    e.stopPropagation();
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
