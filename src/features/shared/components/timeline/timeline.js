import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './timeline.scss';

const component = props =>
  h('.timeline', {
    style: {
      display: props.display,
      transform: props.transform,
    },
  });

const composed = compose(
  pure,
  setPropTypes({
    isVisible: PropTypes.bool,
    offset: PropTypes.number.isRequired,
  }),
  mapProps(props => ({
    display: props.isVisible ? 'block' : 'none',
    transform: `translateX(${props.offset}px)`,
  })),
)(component);

export const Timeline = composed;
