import get from 'lodash/fp/get';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import React from 'react';
import h from 'react-hyperscript';
import keydown from 'react-keydown';
import song from '../../../song';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { SequencerToolbarContainer } from '../sequencer-toolbar/sequencer-toolbar-container';
import './sequencer.scss';

const { someNoteWillMoveOutside } = song.helpers;

export class Sequencer extends React.Component {
  static propTypes = {
    activeSequenceId: React.PropTypes.string.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onDeselectAll: React.PropTypes.func.isRequired,
    onDrag: React.PropTypes.func.isRequired,
    onDraw: React.PropTypes.func.isRequired,
    onDuplicate: React.PropTypes.func.isRequired,
    onErase: React.PropTypes.func.isRequired,
    onKeyPress: React.PropTypes.func.isRequired,
    onNudge: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onSelectAll: React.PropTypes.func.isRequired,
    onSelectInArea: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  componentDidMount() {
    if (!this.contentRef) return;
    this.contentRef.scrollTop = getCenteredScroll(
      this.contentRef,
    );
  }

  render() {
    return h('.sequencer', [
      h(SequencerToolbarContainer),
      h('.sequencer__content', {
        ref: this.setContentRef,
      }, [
        h('.sequencer__content__wrapper', [
          h(Keys, {
            onKeyPress: this.props.onKeyPress,
          }),
          h(Grid, {
            activeSequenceId: this.props.activeSequenceId,
            measureCount: this.props.measureCount,
            notes: this.props.notes,
            onDelete: this.props.onDelete,
            onDeselectAll: this.props.onDeselectAll,
            onDrag: this.props.onDrag,
            onDraw: this.props.onDraw,
            onDuplicate: this.props.onDuplicate,
            onErase: this.props.onErase,
            onNudge: this.props.onNudge,
            onResize: this.props.onResize,
            onSelect: this.props.onSelect,
            onSelectAll: this.props.onSelectAll,
            onSelectInArea: this.props.onSelectInArea,
            selectedNotes: this.props.selectedNotes,
            toolType: this.props.toolType,
            sequencerContentRef: this.contentRef,
          }),
        ]),
      ]),
    ]);
  }

  @keydown('backspace', 'del')
  delete(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDelete({
      ids: map(get('id'), this.props.selectedNotes),
    });
  }

  @keydown('ctrl+d', 'meta+d')
  deselectAll(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDeselectAll();
  }

  @keydown('ctrl+shift+d', 'meta+shift+d')
  duplicate(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDuplicate({
      notes: song.helpers.duplicateNotes(this.props.selectedNotes),
    });
  }

  nudge = (e, delta) => {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    if (someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.props.selectedNotes,
    )) return;

    this.props.onNudge({
      ids: map(get('id'), this.props.selectedNotes),
      delta,
    });
  }

  @keydown('down');
  nudgeDown(e) {
    this.nudge(e, { x: 0, y: 1 });
  }

  @keydown('left');
  nudgeLeft(e) {
    this.nudge(e, { x: -1, y: 0 });
  }

  @keydown('right');
  nudgeRight(e) {
    this.nudge(e, { x: 1, y: 0 });
  }

  @keydown('up');
  nudgeUp(e) {
    this.nudge(e, { x: 0, y: -1 });
  }

  @keydown('ctrl+a', 'meta+a')
  selectAll() {
    if (this.props.notes.length === this.props.selectedNotes.length) return;

    this.props.onSelectAll({
      ids: map(get('id'), this.props.notes),
    });
  }

  setContentRef = (ref) => {
    this.contentRef = ref;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}
