import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, setPropTypes, pure, withHandlers } from 'recompose';
import './note.scss';

const component = ({
  top,
  className,
  left,
  handleMouseDown,
  handleMouseUp,
}) => h('.note', {
  className,
  style: { top, left },
}, [
  h('.note__point', {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  }, [
    h('.note__point__fill'),
  ]),
]);

export const Note = compose([
  setPropTypes({
    note: PropTypes.object,
    isSelected: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
  }),
  withHandlers({
    handleMouseDown: ({ onMouseDown, note }) => (e) => {
      onMouseDown(note, e);
    },
    handleMouseUp: ({ onMouseUp, note }) => (e) => {
      onMouseUp(note, e);
    },
  }),
  mapProps(({ isSelected, note, ...rest }) => ({
    top: note.position.y * 40,
    left: note.position.x * 40,
    className: classnames({
      'note--active': isSelected,
    }),
    ...rest,
  })),
  pure,
])(component);
