import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-sequence-note.scss';

export const ZenSequenceNote = React.createClass({
  propTypes: {
    top: PropTypes.number,
    left: PropTypes.number,
  },
  render() {
    return (
      h('div.zen-sequence-note', [
        h('div.zen-sequence-note__point', {
          style: {
            top: this.props.top * 40,
            left: this.props.left * 40,
          },
        }, [
          h('div.zen-sequence-note__point__fill'),
        ]),
      ])
    );
  },
});
