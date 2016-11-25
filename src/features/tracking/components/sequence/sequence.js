import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import * as constants from '../../constants';
import './sequence.scss';

export class Sequence extends React.Component {
  static propTypes = {
    isSelected: React.PropTypes.bool.isRequired,
    onContextMenu: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    sequence: React.PropTypes.object.isRequired,
  }

  render() {
    return h('.sequence', {
      className: classnames({
        'sequence--active': this.props.isSelected,
      }),
      style: this.getStyle(),
      onClick: this.handleClick,
      onContextMenu: this.handleContextMenu,
      onDoubleClick: this.handleDoubleClick,
    }, [
      ...this.props.sequence.notes.map(note => h('.sequence__note', {
        style: {
          transform: `translate(${note.points[0].x * 2}px, ${note.points[0].y}px)`,
          width: ((note.points[1].x - note.points[0].x) + 1) * 2,
        },
      })),
    ]);
  }

  getStyle() {
    return {
      transform: `translateX(${measureCountToPx(this.props.sequence.position)}px)`,
      width: measureCountToPx(this.props.sequence.measureCount),
    };
  }

  handleClick = (e) => {
    if (!this.props.onSelect) return;
    this.props.onSelect(this.props.sequence.id);
    e.stopPropagation();
  }

  handleContextMenu = (e) => {
    const items = [
      {
        text: 'Delete',
        action: constants.contextMenuActions.DELETE_SEQUENCE,
        id: this.props.sequence.id,
      },
    ];

    this.props.onContextMenu(items, { x: e.pageX, y: e.pageY });
    e.preventDefault();
    e.stopPropagation();
  }

  handleDoubleClick = (e) => {
    this.props.openSequence(this.props.sequence.id);
    e.stopPropagation();
  }
}

function measureCountToPx(count) {
  return ((count * 4) * 8) * 2;
}
