import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-notes.scss';
import { ZenNote } from 'components/zen-note/zen-note';

export const ZenNotes = React.createClass({
  propTypes: {
    notes: PropTypes.array,
    selectedNotes: PropTypes.array,
    onNotePress: PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.notes, this.props.notes)
      || !_.isEqual(nextProps.selectedNotes, this.props.selectedNotes);
  },
  render() {
    return (
      h('div.zen-notes', this.props.notes.map((note, index) =>
        h(ZenNote, {
          key: index,
          isSelected: this.isSelected(note),
          note,
          onPress: this.props.onNotePress,
        })
      ))

    );
  },
  isSelected(note) {
    return _.includes(this.props.selectedNotes, note);
  },
});
