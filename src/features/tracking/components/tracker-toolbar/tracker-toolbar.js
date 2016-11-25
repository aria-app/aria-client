import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './tracker-toolbar.scss';

const { IconButton, Toolbar } = shared.components;

export class TrackerToolbar extends React.Component {
  static propTypes = {
    deleteSequence: React.PropTypes.func.isRequired,
    extendSequence: React.PropTypes.func.isRequired,
    moveSequenceLeft: React.PropTypes.func.isRequired,
    moveSequenceRight: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string.isRequired,
    shortenSequence: React.PropTypes.func.isRequired,
  }

  render() {
    return h(Toolbar, {
      className: 'tracker-toolbar',
      position: 'top',
      isAlternate: !!this.props.selectedSequenceId,
      alternateLeftItems: [
        h('.tracker-toolbar__sequence-actions', [
          h(IconButton, {
            icon: 'pencil',
            onClick: () => this.props.openSequence(),
          }),
          h(IconButton, {
            icon: 'trash',
            onClick: () => this.props.deleteSequence(),
          }),
          h(IconButton, {
            icon: 'long-arrow-left',
            onClick: () => this.props.shortenSequence(),
          }),
          h(IconButton, {
            icon: 'arrow-left',
            onClick: () => this.props.moveSequenceLeft(),
          }),
          h(IconButton, {
            icon: 'arrow-right',
            onClick: () => this.props.moveSequenceRight(),
          }),
          h(IconButton, {
            icon: 'long-arrow-right',
            onClick: () => this.props.extendSequence(),
          }),
        ]),
      ],
    });
  }
}
