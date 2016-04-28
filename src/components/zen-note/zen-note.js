import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, setPropTypes, pure, withHandlers } from 'recompose';
import './zen-note.scss';

const component = ({
  bottom,
  className,
  left,
  handlePress,
}) => h('.zen-note', {
  className,
  style: { bottom, left },
}, [
  h('.zen-note__point', {
    onClick: handlePress,
  }, [
    h('.zen-note__point__fill'),
  ]),
]);

export const ZenNote = compose([
  setPropTypes({
    note: PropTypes.object,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
  }),
  withHandlers({
    handlePress: ({ onPress, note }) => e => {
      onPress(note, e.metaKey || e.ctrlKey);
    },
  }),
  mapProps(({ isSelected, note, ...rest }) => ({
    bottom: ((note.octave * 12) + note.pitch) * 40,
    left: note.time * 40,
    className: classnames({
      'zen-note--active': isSelected,
    }),
    ...rest,
  })),
  pure,
])(component);
