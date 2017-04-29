import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import * as constants from '../../constants';
import './sequence.scss';

export class Sequence extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    onContextMenu: React.PropTypes.func.isRequired,
    onOpen: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string.isRequired,
    sequence: React.PropTypes.object.isRequired,
  }

  render() {
    return h('.sequence', {
      className: this.getClassName(),
      style: this.getStyle(),
      onClick: this.handleClick,
      onContextMenu: this.handleContextMenu,
      onDoubleClick: this.handleDoubleClick,
    }, [
      ...this.props.sequence.notes.map(note => h('.sequence__note', {
        style: getNoteStyle(note),
      })),
    ]);
  }

  getClassName() {
    return classnames({
      'sequence--active': this.getIsSelected(),
    }, this.props.className);
  }

  getIsSelected = () =>
    this.props.sequence.id === this.props.selectedSequenceId;

  getStyle() {
    return {
      transform: `translateX(${measureCountToPx(this.props.sequence.position)}px)`,
      width: measureCountToPx(this.props.sequence.measureCount),
    };
  }

  handleClick = (e) => {
    e.stopPropagation();

    if (this.getIsSelected()) {
      this.props.onOpen(this.props.sequence);
      return;
    }

    this.props.onSelect(this.props.sequence);
  }

  handleContextMenu = (e) => {
    const items = [
      {
        text: 'Delete',
        action: constants.contextMenuActions.DELETE_SEQUENCE,
        sequence: this.props.sequence,
      },
    ];

    this.props.onContextMenu(items, {
      x: e.pageX,
      y: e.pageY,
    });

    e.preventDefault();
    e.stopPropagation();
  }
}

function getNoteStyle(note) {
  return {
    transform: `translate(${note.points[0].x * 2}px, ${note.points[0].y}px)`,
    width: ((note.points[1].x - note.points[0].x) + 1) * 2,
  };
}

function measureCountToPx(count) {
  return ((count * 4) * 8) * 2;
}
