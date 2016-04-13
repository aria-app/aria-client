import React from 'react';
import h from 'react-hyperscript';
import './zen-sequence-toolbar.scss';
import { synths } from 'helpers/zen-synths/zen-synths';

export const ZenSequenceToolbar = React.createClass({
  propTypes: {
    requestSetSynth: React.PropTypes.func,
  },
  render() {
    return (
      h('.zen-sequence-toolbar', [
        h('.zen-sequence-toolbar__right', [
          h(
            'button.zen-sequence-toolbar__set-synth--sawtooth',
            { onClick: () => this.props.requestSetSynth(synths.sawtooth) },
            'SAWTOOTH'
          ),
          h(
            'button.zen-sequence-toolbar__set-synth--sine',
            { onClick: () => this.props.requestSetSynth(synths.sine) },
            'SINE'
          ),
          h(
            'button.zen-sequence-toolbar__set-synth--square',
            { onClick: () => this.props.requestSetSynth(synths.square) },
            'SQUARE'
          ),
        ]),
      ])
    );
  },
});
