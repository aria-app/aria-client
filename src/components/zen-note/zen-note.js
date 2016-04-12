import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-note.scss';

export const ZenNote = React.createClass({
  propTypes: {
    note: PropTypes.object,
    step: PropTypes.number,
    onPress: PropTypes.func,
  },
  render() {
    const bottom = ((this.props.note.octave * 12) + this.props.note.pitch) * 40;
    const left = this.props.note.time * 40;
    return (
      h('div.zen-note', {
        style: { bottom, left },
        onClick: () => this.props.onPress(this.props.note),
      }, [
        h('div.zen-note__fill'),
      ])
    );
  },
});
