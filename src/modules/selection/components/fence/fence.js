import _ from 'lodash';
import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, setPropTypes, pure } from 'recompose';
import './fence.scss';

const component = ({
  display,
  height,
  transform,
  width,
}) => h('.fence', {
  style: {
    display,
    height,
    transform,
    width,
  },
});

const composed = compose([
  pure,
  setPropTypes({
    newPosition: PropTypes.object,
    startPosition: PropTypes.object,
    isSelecting: PropTypes.bool,
  }),
  mapProps(props => ({
    display: getDisplay(props.isSelecting, props.startPosition, props.newPosition),
    height: getHeight(props.startPosition, props.newPosition),
    transform: getTransform(props.startPosition, props.newPosition),
    width: getWidth(props.startPosition, props.newPosition),
  })),
])(component);

export const Fence = composed;

function getDisplay(isSelecting, start, end) {
  return isSelecting && !_.isEqual(start, end)
    ? 'block'
    : 'none';
}

function getHeight(start, end) {
  if (!start || !end) return 0;
  return (Math.abs(end.y - start.y) + 1) * 40;
}

function getTransform(start, end) {
  if (!start || !end) {
    return 'translate(0px, 0px)';
  }
  const x = Math.min(start.x, end.x) * 40;
  const y = Math.min(start.y, end.y) * 40;

  return `translate(${x}px, ${y}px)`;
}

function getWidth(start, end) {
  if (!start || !end) return 0;
  return (Math.abs(end.x - start.x) + 1) * 40;
}
