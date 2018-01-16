import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import keydown from 'react-keydown';
import shared from '../../../shared';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { SequencerToolbar } from '../sequencer-toolbar/sequencer-toolbar';
import './sequencer.scss';

const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { duplicateNotes, someNoteWillMoveOutside } = shared.helpers;


export class Sequencer extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeselectAll: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDraw: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onErase: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onNudge: PropTypes.func.isRequired,
    onOctaveDown: PropTypes.func.isRequired,
    onOctaveUp: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onSelectInArea: PropTypes.func.isRequired,
    onToolSelect: PropTypes.func.isRequired,
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    sequence: PropTypes.object.isRequired,
    toolType: PropTypes.string.isRequired,
  }

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
        ref: this.setContentRef,
      }, [
        h('.sequencer__content__wrapper', [
          h(Keys, {
            onKeyPress: this.handleKeysKeyPress,
          }),
          h(Grid, {
            measureCount: this.props.measureCount,
            notes: this.props.notes,
            onDrag: this.handleGridDrag,
            onDraw: this.handleGridDraw,
            onErase: this.handleGridErase,
            onResize: this.handleGridResize,
            onSelect: this.handleGridSelect,
            onSelectInArea: this.handleGridSelectInArea,
            selectedNotes: this.props.selectedNotes,
            sequencerContentRef: this.contentElementRef,
            toolType: this.props.toolType,
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

  handleGridDrag = notes =>
    this.props.onDrag({ notes });

  handleGridDraw = point =>
    this.props.onDraw({
      sequence: this.props.sequence,
      point,
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

  handleKeysKeyPress = (pitch) => {
    this.props.onKeyPress({
      sequence: this.props.sequence,
      pitch,
    });
  }

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
      previousToolType: this.props.toolType,
      toolType: DRAW,
    });

  handleToolbarDuplicate = () =>
    this.props.onDuplicate({
      notes: duplicateNotes(this.props.selectedNotes),
    });

  handleToolbarEraseToolSelect = () =>
    this.props.onToolSelect({
      previousToolType: this.props.toolType,
      toolType: ERASE,
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
      previousToolType: this.props.toolType,
      toolType: PAN,
    });

  handleToolbarSelectToolSelect = () =>
    this.props.onToolSelect({
      previousToolType: this.props.toolType,
      toolType: SELECT,
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

  @keydown('down')
  nudgeDown(e) {
    this.nudge(e, { x: 0, y: 1 });
  }

  @keydown('left')
  nudgeLeft(e) {
    this.nudge(e, { x: -1, y: 0 });
  }

  @keydown('right')
  nudgeRight(e) {
    this.nudge(e, { x: 1, y: 0 });
  }

  @keydown('up')
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
