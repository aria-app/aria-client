import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './zen-position-marker.scss';

const component = ({ left }) =>
  h('.zen-position-marker', { style: { left } });

export const ZenPositionMarker = compose([
  setPropTypes({
    position: PropTypes.number,
  }),
  mapProps(({ position }) => ({
    left: position * 40,
  })),
  pure,
])(component);
