import isEmpty from 'lodash/fp/isEmpty';
import negate from 'lodash/fp/negate';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './tracker-toolbar.scss';

const { IconButton, Toolbar } = shared.components;

export class TrackerToolbar extends React.Component {
  static propTypes = {
    onSelectedSequenceMoveLeft: React.PropTypes.func.isRequired,
    onSelectedSequenceMoveRight: React.PropTypes.func.isRequired,
    onSelectedSequenceOpen: React.PropTypes.func.isRequired,
    onSequenceDelete: React.PropTypes.func.isRequired,
    onSequenceExtend: React.PropTypes.func.isRequired,
    onSequenceShorten: React.PropTypes.func.isRequired,
    selectedSequence: React.PropTypes.object.isRequired,
  }

  render() {
    return h(Toolbar, {
      className: 'tracker-toolbar',
      position: 'top',
      isAlternate: this.getIsAlternate(),
      alternateLeftItems: [
        h('.tracker-toolbar__sequence-actions', [
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__open',
            icon: 'pencil',
            onClick: this.props.onSelectedSequenceOpen,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__delete',
            icon: 'trash',
            onClick: this.handleSequenceActionsDeleteClick,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__shorten',
            icon: 'long-arrow-left',
            onClick: this.handleSequenceActionsShortenClick,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__move-left',
            icon: 'arrow-left',
            onClick: this.props.onSelectedSequenceMoveLeft,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__move-right',
            icon: 'arrow-right',
            onClick: this.props.onSelectedSequenceMoveRight,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__extend',
            icon: 'long-arrow-right',
            onClick: this.handleSequenceActionsExtendClick,
          }),
        ]),
      ],
    });
  }

  getIsAlternate = () =>
    negate(isEmpty)(this.props.selectedSequence);

  handleSequenceActionsDeleteClick = () =>
    this.props.onSequenceDelete(this.props.selectedSequence.id);

  handleSequenceActionsExtendClick = () =>
    this.props.onSequenceExtend(this.props.selectedSequence.id);

  handleSequenceActionsShortenClick = () => {
    if (this.props.selectedSequence.measureCount < 2) return;
    this.props.onSequenceShorten(this.props.selectedSequence.id);
  }
}
