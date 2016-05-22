import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import sound from 'ducks/sound';
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
    position: PropTypes.number,
  }),
  mapProps(({ playbackState, position }) => {
    return {
      display: playbackState === sound.constants.playbackStates.STOPPED
        ? 'none'
        : 'block',
      transform: `translateX(${position * 40}px)`,
    };
  }),
])(component);

export const PositionMarker = composed;
