import React from 'react';
import h from 'react-hyperscript';
import './zen-sequence-keys.scss';

export const ZenSequenceKeys = React.createClass({
  render() {
    const keys = [
      ...getOctave(8).slice(11, 12),
      ...getOctave(7),
      ...getOctave(6),
      ...getOctave(5),
      ...getOctave(4),
      ...getOctave(3),
      ...getOctave(2),
      ...getOctave(1),
      ...getOctave(0).slice(0, 3),
    ];
    return (
      h('div.zen-sequence-keys',
        keys.map(key =>
          h(`div.zen-sequence-keys__key--${key.type}`,
          key.name === 'C' ? key.number : ''
        ))
      )
    );
  },
});

function getOctave(number) {
  return [
    { type: 'ivory', name: 'B', number },
    { type: 'ebony', name: 'Bb', number },
    { type: 'ivory', name: 'A', number },
    { type: 'ebony', name: 'G#', number },
    { type: 'ivory', name: 'G', number },
    { type: 'ebony', name: 'F#', number },
    { type: 'ivory', name: 'F', number },
    { type: 'ivory', name: 'E', number },
    { type: 'ebony', name: 'Eb', number },
    { type: 'ivory', name: 'D', number },
    { type: 'ebony', name: 'C#', number },
    { type: 'ivory', name: 'C', number },
  ];
}
