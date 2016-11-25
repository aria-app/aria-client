import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import shared from '../../../shared';
import { Sequence } from '../sequence/sequence';
import './track.scss';

const { Icon } = shared.components;

export class Track extends React.Component {
  static propTypes = {
    addSequence: React.PropTypes.func.isRequired,
    deselectSequence: React.PropTypes.func.isRequired,
    isMuted: React.PropTypes.bool.isRequired,
    isSoloing: React.PropTypes.bool.isRequired,
    onSequenceContextMenu: React.PropTypes.func.isRequired,
    onTrackSelect: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    songMeasureCount: React.PropTypes.number.isRequired,
    toggleTrackIsMuted: React.PropTypes.func.isRequired,
    toggleTrackIsSoloing: React.PropTypes.func.isRequired,
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
              className: classnames({
                'track__body__header__actions__action--active': this.props.isMuted,
              }),
              onClick: this.handleBodyHeaderActionsActionMuteClick,
            }, ['M']),
            h('.track__body__header__actions__action.track__body__header__actions__action--solo', {
              className: classnames({
                'track__body__header__actions__action--active': this.props.isSoloing,
              }),
              onClick: this.handleBodyHeaderActionsActionSoloClick,
            }, ['S']),
          ]),
        ]),
        h('.track__body__sequences', {
          style: this.getBodySequencesStyle(),
        }, [
          ...this.props.track.sequences.map(sequence => h(Sequence, {
            isSelected: sequence.id === this.props.selectedSequenceId,
            onSelect: this.handleBodySequencesSequenceClick,
            openSequence: this.props.openSequence,
            onContextMenu: this.props.onSequenceContextMenu,
            sequence,
          })),
          h('.track__body__sequences__add-button', {
            onClick: this.handleBodySequencesAddButtonClick,
            style: this.getBodySequencesAddButtonStyle(),
          }, [
            h(Icon, {
              icon: 'plus',
              size: 'large',
            }),
          ]),
        ]),
      ]),
    ]);
  }

  getAddPosition() {
    return _(this.props.track.sequences)
      .map(s => s.position + s.measureCount)
      .max() || 0;
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

  handleBodyHeaderClick = () => {
    this.props.onTrackSelect(this.props.track);
  }

  handleBodyHeaderActionsActionMuteClick = (e) => {
    this.props.toggleTrackIsMuted(this.props.track.id);
    e.stopPropagation();
  }

  handleBodyHeaderActionsActionSoloClick = (e) => {
    this.props.toggleTrackIsSoloing(this.props.track.id);
    e.stopPropagation();
  }

  handleBodySequencesAddButtonClick = () => {
    this.props.addSequence(this.props.track.id, this.getAddPosition());
  }

  handleBodySequencesSequenceClick = (id) => {
    this.props.selectSequence(id);
  }
}
