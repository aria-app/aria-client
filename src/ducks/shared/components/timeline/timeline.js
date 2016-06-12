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
    offset: PropTypes.number.isRequired,
  }),
  mapProps((props) => ({
    transform: `translateX(${props.offset}px)`,
  })),
])(component);

export const Timeline = composed;
