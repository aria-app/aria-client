import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import './zen-sequence-toolbar.scss';
import { synths } from 'helpers/zen-synths/zen-synths';

export const ZenSequenceToolbar = React.createClass({
  propTypes: {
    requestSetSynth: React.PropTypes.func,
    synth: React.PropTypes.object,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  },
  render() {
    return (
      h('.zen-sequence-toolbar', [
        h('.zen-sequence-toolbar__right', [
          h('.zen-sequence-toolbar__set-synth', {
            className: this.getClassName(synths.sawtooth),
            onClick: () => this.props.requestSetSynth(synths.sawtooth),
          },
            'SAWTOOTH'
          ),
          h('.zen-sequence-toolbar__set-synth', {
            className: this.getClassName(synths.sine),
            onClick: () => this.props.requestSetSynth(synths.sine),
          },
            'SINE'
          ),
          h('.zen-sequence-toolbar__set-synth', {
            className: this.getClassName(synths.square),
            onClick: () => this.props.requestSetSynth(synths.square),
          },
            'SQUARE'
          ),
        ]),
      ])
    );
  },
  getClassName(synthType) {
    return classnames({
      'zen-sequence-toolbar__set-synth--active':
        synthType === this.props.synth.voices[0].oscillator.type,

      'zen-sequence-toolbar__set-synth--sawtooth':
        synthType === synths.sawtooth,

      'zen-sequence-toolbar__set-synth--sine':
        synthType === synths.sine,

      'zen-sequence-toolbar__set-synth--square':
        synthType === synths.square,

    });
  },
});
