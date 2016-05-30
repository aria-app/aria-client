import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import './sequence.scss';

const component = ({
  isSelected,
  onClick,
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
}, [
  h('.sequence__note'),
]);

const composed = compose([
  setDisplayName('Sequence'),
  pure,
  setPropTypes({
    isSelected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    sequence: React.PropTypes.object.isRequired,
  }),
  mapProps(props => ({
    ...props,
    transform: `translateX(${measureCountToPx(props.sequence.position)}px)`,
    width: measureCountToPx(props.sequence.measureCount),
  })),
  withHandlers({
    onClick: (props) => (e) => {
      props.onSelect(props.sequence.id);
      e.stopPropagation();
    },
  }),
])(component);

export const Sequence = composed;

function measureCountToPx(count) {
  return count * 4 * 8 * 2;
}
