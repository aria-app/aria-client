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
            {
              onMouseDown: () => this.handleMouseDown(key),
              onMouseUp: () => this.handleMouseUp(key),
            },
            key.name === 'C' ? key.number : ''
          )
        )
      )
    );
  },
  handleMouseDown(key) {
    const oscillator = this.props.audioContext.createOscillator();
    oscillator.connect(this.props.audioContext.destination);
    oscillator.type = 'square';
    oscillator.frequency.value = key.frequency * 4;
    oscillator.start();
    this.setState({
      oscillator,
    });
  },
  handleMouseUp(key) {
    this.state.oscillator.stop();
  },
});

function getOctave(number) {
  return [
    { type: 'ivory', name: 'B', frequency: 30.87, number },
    { type: 'ebony', name: 'Bb', frequency: 29.14, number },
    { type: 'ivory', name: 'A', frequency: 27.50, number },
    { type: 'ebony', name: 'G#', frequency: 25.96, number },
    { type: 'ivory', name: 'G', frequency: 24.50, number },
    { type: 'ebony', name: 'F#', frequency: 23.12, number },
    { type: 'ivory', name: 'F', frequency: 21.83, number },
    { type: 'ivory', name: 'E', frequency: 20.60, number },
    { type: 'ebony', name: 'Eb', frequency: 19.45, number },
    { type: 'ivory', name: 'D', frequency: 18.35, number },
    { type: 'ebony', name: 'C#', frequency: 17.32, number },
    { type: 'ivory', name: 'C', frequency: 16.35, number },
  ];
}
