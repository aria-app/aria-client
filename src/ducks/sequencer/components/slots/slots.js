import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './slots.scss';

const component = ({
  measureCount,
  rows,
}) => h('.slots', {
  style: {
    width: measureCount * 4 * 8 * 40,
  },
}, rows);

const composed = compose([
  pure,
  setPropTypes({
    measureCount: PropTypes.number.isRequired,
    scale: PropTypes.array.isRequired,
  }),
  mapProps(({
    measureCount,
    scale,
    }) => ({
      rows: getRows(scale, measureCount),
      measureCount,
    })
  ),
])(component);

export const Slots = composed;

function getRowClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = _.includes(step.name, '#')
    ? 'sharp'
    : '';
  return `slots__slot--${letter}${suffix}`;
}

function getRows(scale, measureCount) {
  return scale.map((row) => h('.slots__row', {
    className: getRowClasses(row),
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
