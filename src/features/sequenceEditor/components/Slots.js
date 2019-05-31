import Dawww from 'dawww';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';

const StyledSlots = styled('div')({
  flex: '1 0 auto',
  minHeight: '100%',
});

export default class Slots extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number,
  };

  render() {
    return (
      <StyledSlots
        dangerouslySetInnerHTML={{
          __html: this.getHTML(),
        }}
      />
    );
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
        viewBox="0 0 ${this.props.measureCount * 4 * 8 * 40} ${Dawww.SCALE
      .length * 40}">
        ${stripes}
        ${slots}
      </svg>
    `;
  }

  getStripe = n => `
    <rect
      fill="black"
      opacity="0.025"
      rx="4"
      ry="4"
      x="${(2 * n + 1) * 320}"
      y="0"
      width="320"
      height="${Dawww.SCALE.length * 40}"
    ></rect>
  `;

  getWidth = () => this.props.measureCount * 4 * 8 * 40;
}

function getSlot(column, row) {
  const isEven = x => x % 2 === 0;
  const fill = isEven(Math.floor(column / 8)) ? 'black' : 'black';
  const size = 1;
  return `
    <rect
      fill="${fill}"
      opacity="0.5"
      x="${column * 40 + (40 - size) / 2}"
      y="${row * 40 + (40 - size) / 2}"
      width="${size + 2}"
      height="${size + 2}"
    ></rect>
  `;
}
