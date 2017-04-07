import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './tracker-toolbar.scss';

const { IconButton, Toolbar } = shared.components;

export class TrackerToolbar extends React.Component {
  static propTypes = {
    onSelectedSequenceDelete: React.PropTypes.func.isRequired,
    onSelectedSequenceExtend: React.PropTypes.func.isRequired,
    onSelectedSequenceMoveLeft: React.PropTypes.func.isRequired,
    onSelectedSequenceMoveRight: React.PropTypes.func.isRequired,
    onSelectedSequenceOpen: React.PropTypes.func.isRequired,
    onSelectedSequenceShorten: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string.isRequired,
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
            onClick: this.props.onSelectedSequenceDelete,
          }),
          h(IconButton, {
            className: 'tracker-toolbar__sequence-actions__shorten',
            icon: 'long-arrow-left',
            onClick: this.props.onSelectedSequenceShorten,
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
            onClick: this.props.onSelectedSequenceExtend,
          }),
        ]),
      ],
    });
  }

  getIsAlternate() {
    return !!this.props.selectedSequenceId;
  }
}
