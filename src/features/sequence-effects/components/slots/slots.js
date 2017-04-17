import { includes, times } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './slots.scss';

const { scale } = shared.constants;

export class Slots extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
  }

  render() {
    return h('.slots', [
      ...getRows(this.props.measureCount),
    ]);
  }
}

const getRowClassLetter = step =>
  step.name.slice(0, 1).toLowerCase();

const getRowClassSuffix = step =>
  (includes('#', step.name) ? 'sharp' : '');

const getRowClass = step =>
  `slots__row--${getRowClassLetter(step)}${getRowClassSuffix(step)}`;

const getSlots = times(n => h('.slots__slot', {
  key: n,
}, [
  h('.slots__slot__fill'),
]));

const getSections = times(sectionNumber =>
  h('.slots__row__section', {
    key: sectionNumber,
  }, [
    ...getSlots(8),
  ]));

function getRows(measureCount) {
  return scale.map((row, index) => h('.slots__row', {
    className: getRowClass(row),
    key: index,
  }, getSections(measureCount * 4)));
}
