import React from 'react';
import h from 'react-hyperscript';
import './zen-note.scss';

export const ZenNote = React.createClass({
  propTypes: {
    note: React.PropTypes.object,
    step: React.PropTypes.number,
    onPress: React.PropTypes.func,
  },
  render() {
    const bottom = ((this.props.note.octave * 12) + this.props.note.pitch) * 40;
    const left = this.props.note.time * 40;

    return (
      h('.zen-note', {
        style: { bottom, left },
      }, [
        h('.zen-note__point', {
          onClick: () => this.props.onPress(this.props.note),
        }, [
          h('.zen-note__point__fill'),
        ]),
      ])
    );
  },
});
