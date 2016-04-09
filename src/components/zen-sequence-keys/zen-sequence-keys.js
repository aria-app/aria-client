import React from 'react';
import h from 'react-hyperscript';
import './zen-sequence-keys.scss';

export const ZenSequenceKeys = React.createClass({
  render() {
    const keys = [
      { number: 8, type: 'ivory', name: 'C' },
      ...getOctave(7),
      ...getOctave(6),
      ...getOctave(5),
      ...getOctave(4),
      ...getOctave(3),
      ...getOctave(2),
      ...getOctave(1),
      { number: 0, type: 'ivory', name: 'B' },
      { number: 0, type: 'ebony', name: 'Bb' },
      { number: 0, type: 'ivory', name: 'A' },
    ];
    return (
      h('div.zen-sequence-keys',
        keys.map(key => h(`div.zen-sequence-keys__key--${key.type}`, key.name))
      )
    );
  },
});

function getOctave(number) {
  return [
   { number, type: 'ivory', name: 'B' },
   { number, type: 'ebony', name: 'Bb' },
   { number, type: 'ivory', name: 'A' },
   { number, type: 'ebony', name: 'G#' },
   { number, type: 'ivory', name: 'G' },
   { number, type: 'ebony', name: 'F#' },
   { number, type: 'ivory', name: 'F' },
   { number, type: 'ivory', name: 'E' },
   { number, type: 'ebony', name: 'Eb' },
   { number, type: 'ivory', name: 'D' },
   { number, type: 'ebony', name: 'C#' },
   { number, type: 'ivory', name: 'C' },
 ];
}
