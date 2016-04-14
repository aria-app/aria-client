import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import _ from 'lodash';
import './zen-note.scss';

export const ZenNote = React.createClass({
  propTypes: {
    note: React.PropTypes.object,
    isSelected: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.note, this.props.note)
      || nextProps.isSelected !== this.props.isSelected;
  },
  render() {
    const bottom = ((this.props.note.octave * 12) + this.props.note.pitch) * 40;
    const left = this.props.note.time * 40;
    const className = classnames({
      'zen-note--active': this.props.isSelected,
    });

    return (
      h('.zen-note', {
        style: { bottom, left },
        className,
      }, [
        h('.zen-note__point', {
          onClick: (e) => this.props.onPress(this.props.note, e.metaKey || e.ctrlKey),
        }, [
          h('.zen-note__point__fill'),
        ]),
      ])
    );
  },
});
