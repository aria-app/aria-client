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
  withState,
} from 'recompose';
import './ruler.scss';


const component = (props) => h('.ruler', [
  h('.ruler__header'),
  h('.ruler__measures', {
    style: {
      width: props.measuresWidth,
    },
    onMouseDown: props.holdPosition,
    onMouseMove: props.movePosition,
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
    setPosition: React.PropTypes.func.isRequired,
  }),
  mapProps((props) => ({
    ...props,
    measuresWidth: props.measureCount * 64,
    measures: getMeasures(props.measureCount),
  })),
  withState('isMovingPosition', 'setIsMovingPosition', false),
  withHandlers({
    holdPosition: (props) => (e) => {
      props.play();
      props.setPosition((e.pageX - e.target.offsetLeft) / 64);
      props.pause();
      props.setIsMovingPosition(() => true);
      const mouseUpListener = window.addEventListener('mouseup', () => {
        props.play();
        props.setIsMovingPosition(() => false);
        window.removeEventListener('mouseup', mouseUpListener);
      });
    },
    movePosition: (props) => (e) => {
      if (!props.isMovingPosition) return;
      props.setPosition((e.pageX - e.target.offsetLeft) / 64);
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
