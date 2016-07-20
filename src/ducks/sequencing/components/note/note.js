import _ from 'lodash';
import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, setDisplayName, setPropTypes, pure, withHandlers } from 'recompose';
import './note.scss';

const component = ({
  className,
  connectorTransform,
  endPointDisplay,
  endPointTransform,
  handleEndpointMouseDown,
  handleMouseDown,
  handleMouseUp,
  transform,
}) => h('.note', {
  className,
  style: { transform },
}, [
  h('.note__point', {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  }, [
    h('.note__point__fill'),
  ]),
  h('.note__point-connector', {
    style: { transform: connectorTransform },
  }),
  h('.note__point', {
    style: {
      display: endPointDisplay,
      transform: endPointTransform,
    },
    onMouseDown: handleEndpointMouseDown,
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
  mapProps((props) => ({
    className: classnames({ 'note--active': props.isSelected }),
    connectorTransform: getConnectorTransform(_.first(props.note.points), _.last(props.note.points)),
    endPointDisplay: _.last(props.note.points).x - _.first(props.note.points).x === 0 ? 'none' : 'flex',
    endPointTransform: getEndPointTransform(_.first(props.note.points), _.last(props.note.points)),
    transform: `translate(${_.first(props.note.points).x * 40}px, ${_.first(props.note.points).y * 40}px)`,
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
