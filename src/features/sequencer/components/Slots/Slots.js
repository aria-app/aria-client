import Dawww from 'dawww';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
// import * as palette from '../../../../styles/palette';
import './Slots.scss';

export class Slots extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
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
      range(0, Dawww.SCALE.length).map(rowNumber =>
        getSlot(columnNumber, rowNumber),
      ),
    );
    const stripes = range(0, this.props.measureCount * 2).map(n =>
      this.getStripe(n),
    );
    return `
      <svg
        width="${this.props.measureCount * 4 * 8 * 40}"
        height="${Dawww.SCALE.length * 40}"
        viewBox="0 0 ${this.props.measureCount * 4 * 8 * 40} ${Dawww.SCALE.length * 40}">
        ${stripes}
        ${slots}
      </svg>
    `;
  }

  getStripe = n => `
    <rect
      fill="white"
      opacity="0.02"
      x="${((2 * n) + 1) * 320}"
      y="0"
      width="320"
      height="${Dawww.SCALE.length * 40}"
    ></rect>
  `;

  getWidth = () =>
    this.props.measureCount * 4 * 8 * 40;
}

function getSlot(column, row) {
  const isEven = x => x % 2 === 0;
  const fill = isEven(Math.floor(column / 8))
    ? 'white'
    : 'white';
  const size = 1;
  return `
    <rect
      fill="${fill}"
      opacity="0.5"
      x="${(column * 40) + ((40 - (size + 2)) / 2)}"
      y="${(row * 40) + ((40 - size) / 2)}"
      width="${size + 2}"
      height="${size}"
    ></rect>
    <rect
      fill="${fill}"
      opacity="0.5"
      x="${(column * 40) + ((40 - size) / 2)}"
      y="${(row * 40) + ((40 - (size + 2)) / 2)}"
      width="${size}"
      height="${size + 2}"
    ></rect>
  `;
}
