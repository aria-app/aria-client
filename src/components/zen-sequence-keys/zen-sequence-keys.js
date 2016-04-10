import React, { PropTypes } from 'react';
// import ADSR from 'adsr';
import Immutable from 'immutable';
import h from 'react-hyperscript';
import './zen-sequence-keys.scss';

export const ZenSequenceKeys = React.createClass({
  propTypes: {
    audioContext: PropTypes.object,
    keys: PropTypes.array,
  },
  getInitialState() {
    return {
      oscillators: Immutable.Map(),
    };
  },
  render() {
    return (
      h('div.zen-sequence-keys',
        this.props.keys.map(key =>
          h(`div.zen-sequence-keys__key--${key.type}`,
            {
              onMouseDown: () => this.handleMouseDown(key),
              onMouseUp: () => this.handleMouseUp(key),
            },
            key.note === 0 ? `C${key.number}` : ''
          )
        )
      )
    );
  },
  handleMouseDown(key) {
    const oscillator = this.getOscillator(key.frequency);
    oscillator.start();
    this.setState({
      oscillators: this.state.oscillators.set(
        key.note,
        oscillator
      ),
    });
  },
  handleMouseUp(key) {
    this.state.oscillators.get(key.note).stop();
  },
  getOscillator(frequency) {
    const oscillator = this.props.audioContext.createOscillator();
    const gain = this.props.audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);

    gain.gain.value = 1;
    gain.connect(this.props.audioContext.destination);

    return oscillator;
  },
  // getOscillatorWithADSR(frequency) {
  //   const oscillator = this.props.audioContext.createOscillator();
  //   const gain = this.props.audioContext.createGain();
  //   const envelope = ADSR(this.props.audioContext);
  //   oscillator.connect(gain);
  //   gain.connect(this.props.audioContext.destination);
  //   gain.gain.value = 0;
  //   envelope.connect(gain.gain);
  //
  //   envelope.attack = 0;
  //   envelope.decay = 2;
  //   envelope.sustain = 0.1;
  //   envelope.release = 2;
  //
  //   envelope.value.value = 1;
  //
  //   oscillator.type = 'square';
  //   oscillator.frequency.value = frequency;
  //
  //   envelope.start(this.props.audioContext.currentTime);
  //   oscillator.start(this.props.audioContext.currentTime);
  //
  //   const stopAt = envelope.stop(this.props.audioContext.currentTime + envelope.sustain);
  //   oscillator.stop(stopAt);
  //   return oscillator;
  // },
});
