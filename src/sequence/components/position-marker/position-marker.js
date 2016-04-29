import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './position-marker.scss';

const component = ({ left }) =>
  h('.position-marker', { style: { left } });

const positionMarker = compose([
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
    position: state.sequence.position,
  };
}

function mapDispatchToProps() {
  return {};
}

export const PositionMarker = connect(
  mapStateToProps,
  mapDispatchToProps
)(positionMarker);
