import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import './sequence.scss';

const component = ({
  isSelected,
  notes,
  onClick,
  onDoubleClick,
  transform,
  width,
}) => h('.sequence', {
  className: classnames({
    'sequence--active': isSelected,
  }),
  style: {
    transform,
    width,
  },
  onClick,
  onDoubleClick,
}, [
  ...notes,
]);

const composed = compose([
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
    onClick: (props) => (e) => {
      props.onSelect(props.sequence.id);
      e.stopPropagation();
    },
    onDoubleClick: (props) => (e) => {
      props.openSequence(props.sequence.id);
      e.stopPropagation();
    },
  }),
])(component);

export const Sequence = composed;

function getNotes(props) {
  return props.sequence.notes.map(note => h('.sequence__note', {
    style: {
      transform: `translate(${note.points[0].x * 2}px, ${note.points[0].y}px)`,
      width: note.points[1].x - note.points[0].x + 1,
    },
  }));
}

function measureCountToPx(count) {
  return count * 4 * 8 * 2;
}
