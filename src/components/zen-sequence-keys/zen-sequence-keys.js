import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-sequence-keys.scss';

export const ZenSequenceKeys = React.createClass({
  propTypes: {
    keys: PropTypes.array,
  },
  render() {
    return (
      h('div.zen-sequence-keys',
        this.props.keys.map(key =>
          h(`div.zen-sequence-keys__key--${key.type}`,
            {
              onMouseDown: () => this.handleMouseDown(key),
              onMouseUp: () => this.handleMouseUp(),
            },
            key.name === 'C' ? `C${key.number}` : ''
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
  handleMouseUp() {
    this.state.oscillator.stop();
  },
});
