import isEmpty from 'lodash/fp/isEmpty';
import negate from 'lodash/fp/negate';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './TrackerToolbar.scss';

const { IconButton, Toolbar } = shared.components;

export class TrackerToolbar extends React.PureComponent {
  static propTypes = {
    onSequenceDelete: PropTypes.func.isRequired,
    onSequenceExtend: PropTypes.func.isRequired,
    onSequenceMoveLeft: PropTypes.func.isRequired,
    onSequenceMoveRight: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceShorten: PropTypes.func.isRequired,
    selectedSequence: PropTypes.object.isRequired,
  }

  static defaultProps = {
    selectedSequence: {},
  };

  render() {
    return h(Toolbar, {
      className: 'tracker-toolbar',
      position: 'top',
      isAlternate: this.getIsAlternate(),
      alternateLeftItems: [
        h('.tracker-toolbar__sequence-actions', [
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__open-button',
            icon: 'pencil',
            onClick: this.props.onSequenceOpen,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__delete-button',
            icon: 'trash',
            onClick: this.props.onSequenceDelete,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__shorten-button',
            icon: 'long-arrow-left',
            isDisabled: this.getIsShortenButtonDisabled(),
            onClick: this.props.onSequenceShorten,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__move-left-button',
            icon: 'arrow-left',
            isDisabled: this.getIsMoveLeftButtonDisabled(),
            onClick: this.props.onSequenceMoveLeft,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__move-right-button',
            icon: 'arrow-right',
            onClick: this.props.onSequenceMoveRight,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__extend-button',
            icon: 'long-arrow-right',
            onClick: this.props.onSequenceExtend,
          }),
        ]),
      ],
    });
  }

  getIsAlternate = () =>
    negate(isEmpty)(this.props.selectedSequence);

  getIsMoveLeftButtonDisabled = () =>
    this.props.selectedSequence.position < 1;

  getIsShortenButtonDisabled = () =>
    this.props.selectedSequence.measureCount < 2;
}
