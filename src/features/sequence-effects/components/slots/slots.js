import getOr from 'lodash/fp/getOr';
import range from 'lodash/fp/range';
import React from 'react';
import h from 'react-hyperscript';
// import { Layer, Rect, Stage } from 'react-konva';
import { neutral } from '../../../../styles/palette';
import shared from '../../../shared';
import './slots.scss';

const { scale } = shared.constants;

export class Slots extends React.PureComponent {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    scrollLeft: React.PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    scrollLeftElement: React.PropTypes.object,
    scrollTop: React.PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    scrollTopElement: React.PropTypes.object,
  }

  render() {
    return h('.slots', {
      dangerouslySetInnerHTML: {
        __html: this.getHTML(),
      },
    });
  }

  getHTML() {
    const stripeRange = range(0, this.props.measureCount * 2);
    const slots = range(0, this.props.measureCount * 4 * 8).map(columnNumber =>
      range(0, scale.length).map(rowNumber =>
        getSlot(columnNumber, rowNumber),
      ),
    );
    const stripes = stripeRange.map(n =>
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

  getVisibleArea = () => {
    const width = getOr(0, 'props.scrollLeftElement.offsetWidth', this);
    const height = getOr(0, 'props.scrollTopElement.offsetHeight', this);

    return {
      max: {
        x: this.props.scrollLeft + toSlotNumber(width),
        y: this.props.scrollTop + toSlotNumber(height),
      },
      min: {
        x: this.props.scrollLeft,
        y: this.props.scrollTop,
      },
    };
  };

  getWidth = () =>
    this.props.measureCount * 4 * 8 * 40;
}

function getSlot(c, r) {
  const isEven = x => x % 2 === 0;
  const fill = isEven(Math.floor(c / 8))
    ? neutral[3]
    : neutral[2];
  return `
  <rect
    fill="${fill}"
    x="${(c * 40) + 14}"
    y="${(r * 40) + 14}"
    width="12"
    height="12"
    rx="2.5"
    ry="2.5"
  ></rect>
  `;
}

// function getHeight() {
//   return scale.length * 40;
// }
//
// function getSlotX(n) {
//   return (n * 40) + 14;
// }
//
// function getSlotY(n) {
//   return (n * 40) + 14;
// }
//
// function getStripeX(n) {
//   return ((2 * n) + 1) * 320;
// }

// h(Stage, {
//   width: this.getWidth(),
//   height: getHeight(),
//   style: {
//     position: 'absolute',
//     left: visibleArea.min.x * 40,
//     top: visibleArea.min.y * 40,
//   },
// }, [
//   h(Layer, [
//     h(Rect, {
//       fill: neutral[2],
//       height: getHeight(),
//       name: 'background',
//       width: this.getWidth(),
//       x: 0,
//       y: 0,
//     }),
//     ...this.getStripesRange().map(n =>
//       h(Rect, {
//         fill: neutral[3],
//         height: getHeight(),
//         name: 'stripe',
//         width: 320,
//         x: getStripeX(n),
//         y: 0,
//       }),
//     ),
//     ...this.getColumnsRange().map(m =>
//       this.getSlotsRange().map(n =>
//         h(Rect, {
//           fill: neutral[3],
//           height: 12,
//           key: `${m}-${n}`,
//           name: 'slot',
//           ref: this.addSlotRef,
//           width: 12,
//           x: getSlotX(m),
//           y: getSlotY(n),
//         }),
//       ),
//     ),
//   ]),
// ]),

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
