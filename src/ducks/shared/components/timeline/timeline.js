import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './timeline.scss';

const component = ({ display, transform }) =>
  h('.timeline', {
    style: {
      display,
      transform,
    },
  });

const composed = compose([
  pure,
  setPropTypes({
    isVisible: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
  }),
  mapProps((props) => ({
    display: props.isVisible ? 'block' : 'none',
    transform: `translateX(${props.offset}px)`,
  })),
])(component);

export const Timeline = composed;
