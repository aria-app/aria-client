import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import sound from 'modules/sound';
import './position-marker.scss';

const component = ({ display, left }) =>
  h('.position-marker', {
    style: {
      display,
      left,
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
    left: position * 40,
  })),
  pure,
])(component);

export const PositionMarker = composed;
