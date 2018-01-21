import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import keydown from 'react-keydown';
import shared from '../../../shared';
import * as constants from '../../constants';
import { Grid } from '../Grid/Grid';
import { Keys } from '../Keys/Keys';
import { SequencerToolbar } from '../SequencerToolbar/SequencerToolbar';
import './Sequencer.scss';

const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;
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
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      previousToolType: SELECT,
      toolType: SELECT,
    };
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
        onClose: this.props.onClose,
        onDelete: this.deleteSelectedNotes.bind(this),
        onDeselectAll: this.deselectAllNotes.bind(this),
        onDrawToolSelect: this.activateDrawTool.bind(this),
        onDuplicate: this.duplicateSelectedNotes.bind(this),
        onEraseToolSelect: this.activateEraseTool.bind(this),
        onOctaveDown: this.handleToolbarOctaveDown,
        onOctaveUp: this.handleToolbarOctaveUp,
        onPanToolSelect: this.activatePanTool.bind(this),
        onSelectToolSelect: this.activateSelectTool.bind(this),
        selectedNotes: this.props.selectedNotes,
        toolType: this.state.toolType,
      }),
      h('.sequencer__content', {
        ref: this.setContentRef,
      }, [
        h('.sequencer__content__wrapper', [
          h(Keys, {
            onKeyPress: this.props.onKeyPress,
          }),
          h(Grid, {
            measureCount: this.props.measureCount,
            notes: this.props.notes,
            onDrag: this.props.onDrag,
            onDraw: this.props.onDraw,
            onErase: this.props.onErase,
            onResize: this.props.onResize,
            onSelect: this.props.onSelect,
            onSelectInArea: this.handleGridSelectInArea,
            selectedNotes: this.props.selectedNotes,
            sequencerContentRef: this.contentElementRef,
            toolType: this.state.toolType,
          }),
        ]),
      ]),
    ]);
  }

  @keydown('d')
  activateDrawTool() {
    this.setState({
      toolType: DRAW,
    });
  }

  @keydown('space')
  activatePanOverride(e) {
    e.preventDefault();
    if (e.repeat) return;
    this.setState(state => ({
      previousToolType: state.toolType,
      toolType: PAN,
    }));
    window.addEventListener('keyup', this.deactivatePanOverride);
  }

  @keydown('e')
  activateEraseTool() {
    this.setState({
      toolType: ERASE,
    });
  }

  @keydown('p')
  activatePanTool() {
    this.setState({
      toolType: PAN,
    });
  }

  @keydown('s')
  activateSelectTool() {
    this.setState({
      toolType: SELECT,
    });
  }

  deactivatePanOverride = (e) => {
    if (e.keyCode !== 32) return;
    this.setState(state => ({
      toolType: state.previousToolType,
    }));
    window.removeEventListener('keyup', this.deactivatePanOverride);
  }

  @keydown('backspace', 'del')
  deleteSelectedNotes(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDelete(this.props.selectedNotes);
  }

  @keydown('ctrl+d', 'meta+d')
  deselectAllNotes(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDeselectAll();
  }

  @keydown('ctrl+shift+d', 'meta+shift+d')
  duplicateSelectedNotes(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDuplicate(duplicateNotes(this.props.selectedNotes));
  }

  handleGridSelectInArea = (startPoint, endPoint, isAdditive) =>
    this.props.onSelectInArea({
      notes: this.props.notes,
      selectedNotes: this.props.selectedNotes,
      endPoint,
      isAdditive,
      startPoint,
    });

  handleToolbarOctaveDown = () =>
    this.props.onOctaveDown(this.props.selectedNotes);

  handleToolbarOctaveUp = () =>
    this.props.onOctaveUp(this.props.selectedNotes);

  nudge = (delta) => {
    if (isEmpty(this.props.selectedNotes)) return;

    if (someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.props.selectedNotes,
    )) return;

    this.props.onNudge(delta, this.props.selectedNotes);
  }

  @keydown('down')
  nudgeDown(e) {
    e.preventDefault();
    this.nudge({ x: 0, y: 1 });
  }

  @keydown('left')
  nudgeLeft(e) {
    e.preventDefault();
    this.nudge({ x: -1, y: 0 });
  }

  @keydown('right')
  nudgeRight(e) {
    e.preventDefault();
    this.nudge({ x: 1, y: 0 });
  }

  @keydown('up')
  nudgeUp(e) {
    e.preventDefault();
    this.nudge({ x: 0, y: -1 });
  }

  @keydown('ctrl+a', 'meta+a')
  selectAll() {
    if (this.props.notes.length === this.props.selectedNotes.length) return;

    this.props.onSelectAll(this.props.notes);
  }

  setContentRef = (contentElementRef) => {
    this.contentElementRef = contentElementRef;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}
