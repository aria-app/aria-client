import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import {
  compose,
  mapProps,
  pure,
  setDisplayName,
  setPropTypes,
  withHandlers,
} from 'recompose';
import transport from 'ducks/transport';
import './ruler.scss';

const { STARTED } = transport.constants.playbackStates;

const component = (props) => h('.ruler', [
  h('.ruler__header'),
  h('.ruler__measures', {
    style: {
      width: props.measuresWidth,
    },
    onMouseDown: props.holdPosition,
  }, [
    ...props.measures,
  ]),
]);

const composed = compose([
  setDisplayName('Ruler'),
  pure,
  setPropTypes({
    measureCount: React.PropTypes.number.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    setPosition: React.PropTypes.func.isRequired,
  }),
  mapProps((props) => ({
    ...props,
    measuresWidth: props.measureCount * 64,
    measures: getMeasures(props.measureCount),
  })),
  withHandlers({
    holdPosition: (props) => (e) => {
      e.persist();
      const startingState = props.playbackState;
      props.play();
      props.setPosition((e.pageX - e.target.offsetLeft) / 64);
      props.pause();
      const moveHandler = (moveE) => {
        const position = moveE.pageX >= e.target.offsetLeft
          ? (moveE.pageX - e.target.offsetLeft) / 64
          : 0;
        const clampedPosition = _.clamp(
          position,
          0,
          props.measureCount
        );
        props.setPosition(clampedPosition);
      };
      const upHandler = () => {
        if (startingState === STARTED) {
          props.play();
        }
        // props.setIsMovingPosition(() => false);
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
      };
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    },
  }),
])(component);

export const Ruler = composed;

function getMeasures(count) {
  return _.times(count, (n) => h('.ruler__measure', {
    key: n,
    style: {
      pointerEvents: 'none',
      transform: `translateX(${n * 64}px)`,
    },
  }, [
    h('.ruler__measure__label', [
      n !== count ? n + 1 : '',
    ]),
    n !== count ? _.times(7, (m) => h('.ruler__measure__eighth', {
      key: m,
      style: {
        transform: `translateX(${(m + 1) * 8}px)`,
      },
    })) : null,
  ]));
}
