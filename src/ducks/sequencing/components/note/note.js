import _ from 'lodash';
import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, setDisplayName, setPropTypes, pure, withHandlers } from 'recompose';
import './note.scss';

const component = props => h('.note', {
  className: props.className,
  style: {
    transform: props.transform,
  },
}, [
  h('.note__point', {
    onMouseDown: props.handleMouseDown,
    onMouseUp: props.handleMouseUp,
  }, [
    h('.note__point__fill'),
  ]),
  h('.note__point-connector', {
    style: {
      transform: props.connectorTransform,
    },
  }),
  h('.note__point', {
    style: {
      display: props.endPointDisplay,
      transform: props.endPointTransform,
    },
    onMouseDown: props.handleEndpointMouseDown,
  }, [
    h('.note__point__fill'),
  ]),
]);

export const Note = compose(
  setDisplayName('Note'),
  pure,
  setPropTypes({
    note: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onEndpointMouseDown: PropTypes.func,
    onEndpointMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
  }),
  withHandlers({
    handleMouseDown: ({ onMouseDown, note }) => (e) => {
      if (!onMouseDown) return;
      onMouseDown(note, e);
    },
    handleMouseUp: ({ onMouseUp, note }) => (e) => {
      if (!onMouseUp) return;
      onMouseUp(note, e);
    },
    handleEndpointMouseDown: props => (e) => {
      if (!props.onEndpointMouseDown) return;
      props.onEndpointMouseDown(props.note, e);
    },
    handleEndpointMouseUp: props => (e) => {
      if (!props.onEndpointMouseUp) return;
      props.onEndpointMouseUp(props.note, e);
    },
  }),
  mapProps(props => ({
    ...props,
    className: classnames({ 'note--active': props.isSelected }),
    connectorTransform: getConnectorTransform(
      _.first(props.note.points),
      _.last(props.note.points)
    ),
    endPointDisplay: is32ndNote(props.note) === 0 ? 'none' : 'flex',
    endPointTransform: getEndPointTransform(_.first(props.note.points), _.last(props.note.points)),
    transform: getTransform(props.note),
  })),
)(component);

function getConnectorTransform(startPoint, endPoint) {
  const { asin, abs, PI, pow, sign, sqrt } = Math;
  const x = ((endPoint.x - startPoint.x) * 40);
  const y = (endPoint.y - startPoint.y) * 40;
  const length = x !== 0
    ? sqrt(abs(pow(x, 2) + pow(y, 2)))
    : 0;
  const rotation = x !== 0
    ? asin(abs(y / length)) * (180 / PI) * sign(y)
    : 0;
  return `rotate(${rotation}deg) scaleX(${x ? length : 0})`;
}

function getEndPointTransform(startPoint, endPoint) {
  const x = (endPoint.x - startPoint.x) * 40;
  const y = (endPoint.y - startPoint.y) * 40;
  return `translate(${x}px, ${y}px)`;
}

function getTransform(note) {
  const { x, y } = _.first(note.points);
  return `translate(${x * 40}px, ${y * 40}px)`;
}

function is32ndNote(note) {
  return _.last(note.points).x - _.first(note.points).x;
}
