import React from 'react';
import h from 'react-hyperscript';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { SequencerToolbarContainer } from '../sequencer-toolbar/sequencer-toolbar-container';
import './sequencer.scss';

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

  setContentRef = (ref) => {
    this.contentRef = ref;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}
