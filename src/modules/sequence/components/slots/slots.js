import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './slots.scss';

const component = ({ rows }) => h('.slots', rows);

const composed = compose([
  setPropTypes({
    measureCount: PropTypes.number,
    drawNote: PropTypes.func,
    playNote: PropTypes.func,
    toolType: PropTypes.string,
  }),
  mapProps(({
    measureCount,
    scale,
    }) => ({
      rows: getRows(scale, measureCount),
    })
  ),
  pure,
])(component);

export const Slots = composed;

function getRows(scale, measureCount) {
  return scale.map((scaleStep) => h('.slots__row', {
    className: `slots__row--${scaleStep.letter}`,
  }, getSections(measureCount * 4)));
}

function getSections(count) {
  return _.times(count, sectionNumber =>
    h('.slots__row__section', {
      key: sectionNumber,
    }, getSlots(8))
  );
}

function getSlots(count) {
  return _.times(count, n =>
    h('.slots__slot', {
      key: n,
    }, h('.slots__slot__fill'))
  );
}
