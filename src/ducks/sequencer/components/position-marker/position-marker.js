import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import transport from 'ducks/transport';
import './position-marker.scss';

const component = ({ display, transform }) =>
  h('.position-marker', {
    style: {
      display,
      transform,
    },
  });

const composed = compose([
  pure,
  setPropTypes({
    playbackState: PropTypes.string,
    offset: PropTypes.number,
  }),
  mapProps(({ playbackState, offset }) => ({
    display: playbackState === transport.constants.playbackStates.STOPPED
      ? 'none'
      : 'block',
    transform: `translateX(${offset}px)`,
  })),
])(component);

export const PositionMarker = composed;
