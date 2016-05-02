import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import sound from 'modules/sound';
import './position-marker.scss';

const component = ({ display, transform }) =>
  h('.position-marker', {
    style: {
      display,
      transform,
    },
  });

const composed = compose([
  setPropTypes({
    playbackState: PropTypes.string,
    position: PropTypes.number,
  }),
  mapProps(({ playbackState, position }) => ({
    display: playbackState === sound.constants.playbackStates.STOPPED
      ? 'none'
      : 'block',
    transform: `translateX(${position * 40}px)`,
  })),
  pure,
])(component);

export const PositionMarker = composed;
