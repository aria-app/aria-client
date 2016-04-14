import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-notes.scss';
import { ZenNote } from 'components/zen-note/zen-note';

export const ZenNotes = React.createClass({
  propTypes: {
    notes: PropTypes.array,
    onNotePress: PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.notes, this.props.notes);
  },
  render() {
    return (
      h('div.zen-notes', this.props.notes.map((note, index) =>
        h(ZenNote, {
          key: index,
          note,
          onPress: this.props.onNotePress,
        })
      ))

    );
  },
});
