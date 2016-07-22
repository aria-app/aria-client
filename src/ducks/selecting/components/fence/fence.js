import _ from 'lodash';
import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, setDisplayName, setPropTypes, pure } from 'recompose';
import './fence.scss';

const component = props => h('.fence', {
  style: {
    display: props.display,
    height: props.height,
    transform: props.transform,
    width: props.width,
  },
});

const composed = compose(
  setDisplayName('Fence'),
  pure,
  setPropTypes({
    newPoint: PropTypes.object.isRequired,
    startPoint: PropTypes.object.isRequired,
    isSelecting: PropTypes.bool.isRequired,
  }),
  mapProps(props => ({
    display: getDisplay(props.isSelecting, props.startPoint, props.newPoint),
    height: getHeight(props.startPoint, props.newPoint),
    transform: getTransform(props.startPoint, props.newPoint),
    width: getWidth(props.startPoint, props.newPoint),
  })),
)(component);

export const Fence = composed;

function getDisplay(isSelecting, start, end) {
  return isSelecting && !_.isEqual(start, end)
    ? 'block'
    : 'none';
}

function getHeight(start, end) {
  if (_.isEmpty(start) || _.isEmpty(end)) return 0;
  return (Math.abs(end.y - start.y) + 1) * 40;
}

function getTransform(start, end) {
  if (_.isEmpty(start) || _.isEmpty(end)) {
    return 'translate(0px, 0px)';
  }
  const x = Math.min(start.x, end.x) * 40;
  const y = Math.min(start.y, end.y) * 40;

  return `translate(${x}px, ${y}px)`;
}

function getWidth(start, end) {
  if (_.isEmpty(start) || _.isEmpty(end)) return 0;
  return (Math.abs(end.x - start.x) + 1) * 40;
}
