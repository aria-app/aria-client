import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import * as constants from '../../constants';
import './sequence.scss';

const component = props => h('.sequence', {
  className: classnames({
    'sequence--active': props.isSelected,
  }),
  style: {
    transform: props.transform,
    width: props.width,
  },
  onClick: props.onClick,
  onContextMenu: props.onContextMenu,
  onDoubleClick: props.onDoubleClick,
}, [
  ...props.notes,
]);

const composed = compose(
  setDisplayName('Sequence'),
  pure,
  setPropTypes({
    isSelected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    sequence: React.PropTypes.object.isRequired,
  }),
  mapProps(props => ({
    ...props,
    notes: getNotes(props),
    transform: `translateX(${measureCountToPx(props.sequence.position)}px)`,
    width: measureCountToPx(props.sequence.measureCount),
  })),
  withHandlers({
    onClick: props => (e) => {
      props.onSelect(props.sequence.id);
      e.stopPropagation();
    },
    onContextMenu: props => (e) => {
      const items = [
        {
          text: 'Delete',
          action: constants.contextMenuActions.DELETE_SEQUENCE,
          id: props.id,
        },
      ];

      props.onContextMenu(items, { x: e.pageX, y: e.pageY });
      e.preventDefault();
      e.stopPropagation();
    },
    onDoubleClick: props => (e) => {
      props.openSequence(props.sequence.id);
      e.stopPropagation();
    },
  }),
)(component);

export const Sequence = composed;

function getNotes(props) {
  return props.sequence.notes.map(note => h('.sequence__note', {
    style: {
      transform: `translate(${note.points[0].x * 2}px, ${note.points[0].y}px)`,
      width: (note.points[1].x - note.points[0].x + 1) * 2,
    },
  }));
}

function measureCountToPx(count) {
  return count * 4 * 8 * 2;
}
