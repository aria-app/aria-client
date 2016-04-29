import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import { getPosition } from '../../selectors';
import './position-marker.scss';

const component = ({ left }) =>
  h('.position-marker', { style: { left } });

const composed = compose([
  setPropTypes({
    position: PropTypes.number,
  }),
  mapProps(({ position }) => ({
    left: position * 40,
  })),
  pure,
])(component);

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    position: getPosition(state),
  };
}

function mapDispatchToProps() {
  return {};
}

export const PositionMarker = connect(
  mapStateToProps,
  mapDispatchToProps
)(composed);
