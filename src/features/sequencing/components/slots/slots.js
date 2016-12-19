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

function getRowClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = includes(step.name, '#')
    ? 'sharp'
    : '';
  return `slots__row--${letter}${suffix}`;
}

function getRows(measureCount) {
  return scale.map(row => h('.slots__row', {
    className: getRowClasses(row),
  }, getSections(measureCount * 4)));
}

function getSections(count) {
  return times(sectionNumber =>
    h('.slots__row__section', {
      key: sectionNumber,
    }, getSlots(8)),
  count);
}

function getSlots(count) {
  return times(n =>
    h('.slots__slot', {
      key: n,
    }, h('.slots__slot__fill')),
  count);
}
