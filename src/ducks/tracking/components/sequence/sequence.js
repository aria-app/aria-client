import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import './sequence.scss';

const component = ({
  onClick,
  width,
}) => h('.sequence', {
  onClick,
  style: {
    width,
  },
}, [
  h('.sequence__note'),
]);

const composed = compose([
  pure,
  setPropTypes({
    isSelected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    sequence: React.PropTypes.object.isRequired,
  }),
  mapProps(props => ({
    ...props,
    width: props.sequence ? props.sequence.measureCount * 96 : 0,
  })),
  withHandlers({
    onClick: (props) => () => {
      props.onSelect(props.sequence.id);
    },
  }),
])(component);

export const Sequence = composed;
