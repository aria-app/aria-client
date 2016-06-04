import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import './slots.scss';

const component = ({
  rows,
}) => h('.slots', rows);

const composed = compose([
  setDisplayName('Slots'),
  pure,
  setPropTypes({
    measureCount: PropTypes.number.isRequired,
    scale: PropTypes.array.isRequired,
  }),
  mapProps((props) => ({
    rows: getRows(props.scale, props.measureCount),
  })),
])(component);

export const Slots = composed;

function getRowClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = _.includes(step.name, '#')
    ? 'sharp'
    : '';
  return `slots__row--${letter}${suffix}`;
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
