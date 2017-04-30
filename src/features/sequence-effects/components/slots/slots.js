import range from 'lodash/fp/range';
import React from 'react';
import h from 'react-hyperscript';
import { neutral } from '../../../../styles/palette';
import shared from '../../../shared';
import './slots.scss';

const { scale } = shared.constants;

export class Slots extends React.PureComponent {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
  }

  render() {
    return h('.slots', {
      dangerouslySetInnerHTML: {
        __html: this.getHTML(),
      },
    });
  }

  getHTML() {
    const slots = range(0, this.props.measureCount * 4 * 8).map(columnNumber =>
      range(0, scale.length).map(rowNumber =>
        getSlot(columnNumber, rowNumber),
      ),
    );
    const stripes = range(0, this.props.measureCount * 2).map(n =>
      this.getStripe(n),
    );
    return `
      <svg
        width="${this.props.measureCount * 4 * 8 * 40}"
        height="${scale.length * 40}"
        viewBox="0 0 ${this.props.measureCount * 4 * 8 * 40} ${scale.length * 40}">
        ${stripes}
        ${slots}
      </svg>
    `;
  }

  getStripe = n => `
    <rect
      fill="${neutral[3]}"
      x="${((2 * n) + 1) * 320}"
      y="0"
      width="320"
      height="${scale.length * 40}"
      rx="2.5"
      ry="2.5"
    ></rect>
  `;

  getWidth = () =>
    this.props.measureCount * 4 * 8 * 40;
}

function getSlot(column, row) {
  const isEven = x => x % 2 === 0;
  const fill = isEven(Math.floor(column / 8))
    ? neutral[3]
    : neutral[2];
  return `
    <rect
      fill="${fill}"
      x="${(column * 40) + 14}"
      y="${(row * 40) + 14}"
      width="12"
      height="12"
      rx="2.5"
      ry="2.5"
    ></rect>
  `;
}
