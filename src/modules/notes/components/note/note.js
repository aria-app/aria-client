import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, setPropTypes, pure, withHandlers } from 'recompose';
import * as helpers from '../../helpers';
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

export const Note = compose([
  pure,
  setPropTypes({
    note: PropTypes.object,
    isSelected: PropTypes.bool,
    onEndpointMouseDown: PropTypes.func,
    onEndpointMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
  }),
  withHandlers({
    handleMouseDown: ({ onMouseDown, note }) => (e) => {
      onMouseDown(note, e);
    },
    handleMouseUp: ({ onMouseUp, note }) => (e) => {
      onMouseUp(note, e);
    },
    handleEndpointMouseDown: props => (e) => {
      props.onEndpointMouseDown(props.note, e);
    },
    handleEndpointMouseUp: props => (e) => {
      props.onEndpointMouseUp(props.note, e);
    },
  }),
  mapProps(({ isSelected, note, ...rest }) => ({
    transform: `translate(${note.position.x * 40}px, ${note.position.y * 40}px)`,
    connectorTransform: getConnectorTransform(note.position, note.endPosition),
    endPointDisplay: note.endPosition.x - note.position.x === 0 ? 'none' : 'flex',
    endPointTransform: getEndPointTransform(note.position, note.endPosition),
    className: classnames({
      'note--active': isSelected,
    }),
    ...rest,
  })),
])(component);

function getConnectorTransform(startPosition, endPosition) {
  const { asin, abs, PI, pow, sign, sqrt } = Math;
  const x = ((endPosition.x - startPosition.x) * 40);
  const y = (endPosition.y - startPosition.y) * 40;
  const length = x !== 0
    ? sqrt(abs(pow(x, 2) + pow(y, 2)))
    : 0;
  const rotation = x !== 0
    ? asin(abs(y / length)) * (180 / PI) * sign(y)
    : 0;
  return `rotate(${rotation}deg) scaleX(${x ? length : 0})`;
}

function getEndPointTransform(startPosition, endPosition) {
  const x = (endPosition.x - startPosition.x) * 40;
  const y = (endPosition.y - startPosition.y) * 40;
  return `translate(${x}px, ${y}px)`;
}
