import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
import './track.scss';

const { synthTypes } = shared.constants;

const component = ({
  backgroundColor,
  onClick,
  track,
}) => h('.track', {
  style: {
    backgroundColor,
  },
  onClick,
}, [
  track.synthType,
]);

const composed = compose([
  pure,
  setPropTypes({
    onSelect: React.PropTypes.func.isRequired,
    track: React.PropTypes.object.isRequired,
  }),
  mapProps(props => ({
    ...props,
    backgroundColor: getBackgroundColor(props.track.synthType),
  })),
  withHandlers({
    onClick: (props) => () => {
      props.onSelect(props.track);
    },
  }),
])(component);

export const Track = composed;

function getBackgroundColor(synthType) {
  return {
    [synthTypes.SQUARE]: 'darkslateblue',
    [synthTypes.SAWTOOTH]: 'royalblue',
    [synthTypes.PWM]: 'mediumpurple',
  }[synthType] || 'royalblue';
}
