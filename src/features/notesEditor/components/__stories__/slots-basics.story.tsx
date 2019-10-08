import React from 'react';
import Slots from '../Slots';

export class SlotsBasics extends React.Component {
  // eslint-disable-next-line
  render() {
    return (
      <div
        style={{
          bottom: 0,
          display: 'flex',
          left: 0,
          overflow: 'auto',
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <Slots measureCount={4} />
      </div>
    );
  }
}
