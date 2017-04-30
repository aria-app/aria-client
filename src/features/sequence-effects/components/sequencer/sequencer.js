import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import React from 'react';
import h from 'react-hyperscript';
import keydown from 'react-keydown';
import shared from '../../../shared';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { SequencerToolbar } from '../sequencer-toolbar/sequencer-toolbar';
import './sequencer.scss';

const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { createNote, duplicateNotes, someNoteWillMoveOutside } = shared.helpers;


export class Sequencer extends React.PureComponent {
  static propTypes = {
    activeSequenceId: React.PropTypes.string.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onClose: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onDeselectAll: React.PropTypes.func.isRequired,
    onDrag: React.PropTypes.func.isRequired,
    onDraw: React.PropTypes.func.isRequired,
    onDuplicate: React.PropTypes.func.isRequired,
    onErase: React.PropTypes.func.isRequired,
    onKeyPress: React.PropTypes.func.isRequired,
    onNudge: React.PropTypes.func.isRequired,
    onOctaveDown: React.PropTypes.func.isRequired,
    onOctaveUp: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onSelectAll: React.PropTypes.func.isRequired,
    onSelectInArea: React.PropTypes.func.isRequired,
    onToolSelect: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    toolType: React.PropTypes.string.isRequired,
    windowHeight: React.PropTypes.number.isRequired,
    windowWidth: React.PropTypes.number.isRequired,
  }

  state = {
    contentScrollTop: 0,
  };

  componentDidMount() {
    if (!this.contentElementRef) return;
    this.contentElementRef.scrollTop = getCenteredScroll(
      this.contentElementRef,
    );
  }

  render() {
    return h('.sequencer', [
      h(SequencerToolbar, {
        measureCount: this.props.measureCount,
        onClose: this.handleToolbarClose,
        onDelete: this.handleToolbarDelete,
        onDeselectAll: this.handleToolbarDeselect,
        onDrawToolSelect: this.handleToolbarDrawToolSelect,
        onDuplicate: this.handleToolbarDuplicate,
        onEraseToolSelect: this.handleToolbarEraseToolSelect,
        onOctaveDown: this.handleToolbarOctaveDown,
        onOctaveUp: this.handleToolbarOctaveUp,
        onPanToolSelect: this.handleToolbarPanToolSelect,
        onSelectToolSelect: this.handleToolbarSelectToolSelect,
        selectedNotes: this.props.selectedNotes,
        toolType: this.props.toolType,
      }),
      h('.sequencer__content', {
        onScroll: this.handleContentScroll,
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
            onDrag: this.handleGridDrag,
            onDraw: this.handleGridDraw,
            onErase: this.handleGridErase,
            onResize: this.handleGridResize,
            onSelect: this.handleGridSelect,
            onSelectInArea: this.handleGridSelectInArea,
            scrollTop: this.state.contentScrollTop,
            selectedNotes: this.props.selectedNotes,
            sequencerContentRef: this.contentElementRef,
            toolType: this.props.toolType,
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth,
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
      notes: this.props.selectedNotes,
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
      notes: duplicateNotes(this.props.selectedNotes),
    });
  }

  handleContentScroll = () => {
    const contentScrollTop = toSlotNumber(getOr(0, 'contentElementRef.scrollTop', this));

    if (isEqual(contentScrollTop, this.state.contentScrollTop)) return;

    this.setState({ contentScrollTop });
  };

  handleGridDrag = notes =>
    this.props.onDrag({ notes });

  handleGridDraw = point =>
    this.props.onDraw({
      note: createNote({
        points: [point, { x: point.x + 1, y: point.y }],
        sequenceId: this.props.activeSequenceId,
      }),
    });

  handleGridErase = note =>
    this.props.onErase({ note });

  handleGridResize = notes =>
    this.props.onResize({ notes });

  handleGridSelect = (isAdditive, note) =>
    this.props.onSelect({
      isAdditive,
      note,
    });

  handleGridSelectInArea = (startPoint, endPoint, isAdditive) =>
    this.props.onSelectInArea({
      notes: this.props.notes,
      selectedNotes: this.props.selectedNotes,
      endPoint,
      isAdditive,
      startPoint,
    });

  handleToolbarClose = () => {
    this.props.onClose();
  }

  handleToolbarDelete = () => {
    this.props.onDelete({
      notes: this.props.selectedNotes,
    });
  }

  handleToolbarDeselect = () => {
    this.props.onDeselectAll();
  }

  handleToolbarDrawToolSelect = () =>
    this.props.onToolSelect({
      toolType: DRAW,
      previousToolType: this.props.toolType,
    });

  handleToolbarDuplicate = () =>
    this.props.onDuplicate({
      notes: duplicateNotes(this.props.selectedNotes),
    });

  handleToolbarEraseToolSelect = () =>
    this.props.onToolSelect({
      toolType: ERASE,
      previousToolType: this.props.toolType,
    });

  handleToolbarOctaveDown = () =>
    this.props.onOctaveDown({
      notes: this.props.selectedNotes,
    });

  handleToolbarOctaveUp = () =>
    this.props.onOctaveUp({
      notes: this.props.selectedNotes,
    });

  handleToolbarPanToolSelect = () =>
    this.props.onToolSelect({
      toolType: PAN,
      previousToolType: this.props.toolType,
    });

  handleToolbarSelectToolSelect = () =>
    this.props.onToolSelect({
      toolType: SELECT,
      previousToolType: this.props.toolType,
    });


  nudge = (e, delta) => {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    if (someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.props.selectedNotes,
    )) return;

    this.props.onNudge({
      notes: this.props.selectedNotes,
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
      notes: this.props.notes,
    });
  }

  setContentRef = (ref) => {
    this.contentElementRef = ref;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
