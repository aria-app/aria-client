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
    connectorTransform: getConnectorTransform(note.slots, note.position, note.endPosition),
    endPointDisplay: note.slots === 1 ? 'none' : 'flex',
    endPointTransform: getEndPointTransform(note.slots, note.position, note.endPosition),
    className: classnames({
      'note--active': isSelected,
    }),
    ...rest,
  })),
  pure,
])(component);

function getConnectorTransform(slots, startPosition, endPosition) {
  const { asin, abs, PI, pow, sign, sqrt } = Math;
  const x = (slots * 40) - 40;
  const y = (endPosition.y - startPosition.y) * 40;
  const length = sqrt(abs(pow(x, 2) + pow(y, 2)));
  const rotation = asin(abs(y / length)) * (180 / PI) * sign(y);
  return `rotate(${rotation}deg) scaleX(${length})`;
}

function getEndPointTransform(slots, startPosition, endPosition) {
  const x = (slots - 1) * 40;
  const y = (endPosition.y - startPosition.y) * 40;
  return `translate(${x}px, ${y}px)`;
}
