import h from 'react-hyperscript';
import React from 'react';
import { Slots } from '../Slots';
// import shared from '../../../../shared';
import './SlotsBasics.story.scss';

// const { Scroller } = shared.components;

export class SlotsBasics extends React.Component {
  // eslint-disable-next-line
  render() {
    return h('.SlotsBasics', [
      // h(Scroller, [
      h(Slots, {
        measureCount: 4,
      }),
      // ]),
    ]);
  }
}
