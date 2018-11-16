import React from 'react';
import { Slots } from '../Slots';
import './SlotsBasics.story.scss';

export class SlotsBasics extends React.Component {
  // eslint-disable-next-line
  render() {
    return (
      <div
        className="SlotsBasics">
        <Slots
          measureCount={4}
        />
      </div>
    );
  }
}
