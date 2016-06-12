import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import './ruler.scss';


const component = ({
  measures,
  measuresWidth,
}) => h('.ruler', [
  h('.ruler__header'),
  h('.ruler__measures', {
    style: {
      width: measuresWidth,
    },
  }, [
    ...measures,
  ]),
]);

const composed = compose([
  setDisplayName('Ruler'),
  pure,
  setPropTypes({
    measureCount: React.PropTypes.number.isRequired,
  }),
  mapProps((props) => ({
    measuresWidth: props.measureCount * 64,
    measures: getMeasures(props.measureCount),
  })),
])(component);

export const Ruler = composed;

function getMeasures(count) {
  return _.times(count, (n) => h('.ruler__measure', {
    key: n,
    style: {
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
