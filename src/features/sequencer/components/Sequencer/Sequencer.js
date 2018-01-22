import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import uniq from 'lodash/fp/uniq';
import without from 'lodash/fp/without';
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
const { duplicateNotes, getNotesInArea, someNoteWillMoveOutside } = shared.helpers;

export class Sequencer extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    noteMap: PropTypes.object.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDraw: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onErase: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onNudge: PropTypes.func.isRequired,
    onOctaveDown: PropTypes.func.isRequired,
    onOctaveUp: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      previousToolType: SELECT,
      selectedNoteIds: [],
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
        selectedNotes: this.getSelectedNotes(),
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
            onErase: this.handleGridErase,
            onResize: this.props.onResize,
            onSelect: this.handleGridSelect,
            onSelectInArea: this.handleGridSelectInArea,
            selectedNotes: this.getSelectedNotes(),
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

    if (isEmpty(this.state.selectedNoteIds)) return;

    this.props.onDelete(this.getSelectedNotes());

    this.setState({
      selectedNoteIds: [],
    });
  }

  @keydown('ctrl+d', 'meta+d')
  deselectAllNotes(e) {
    e.preventDefault();

    if (isEmpty(this.state.selectedNoteIds)) return;

    this.setState({
      selectedNoteIds: [],
    });
  }

  @keydown('ctrl+shift+d', 'meta+shift+d')
  duplicateSelectedNotes(e) {
    e.preventDefault();

    if (isEmpty(this.state.selectedNoteIds)) return;

    const duplicatedNotes = duplicateNotes(this.getSelectedNotes());

    this.props.onDuplicate(duplicatedNotes);

    this.setState({
      selectedNoteIds: map('id', duplicatedNotes),
    });
  }

  getSelectedNotes = () =>
    map(
      id => getOr({}, `props.noteMap.${id}`, this),
      this.state.selectedNoteIds,
    );

  handleGridErase = (note) => {
    this.props.onErase(note);
    this.setState({
      selectedNoteIds: [],
    });
  };

  handleGridSelect = (note, isAdditive) => {
    this.setState(state => ({
      selectedNoteIds: isAdditive
        ? toggleInArray(note.id, state.selectedNoteIds)
        : [note.id],
    }));
  };

  handleGridSelectInArea = (startPoint, endPoint, isAdditive) => {
    const notesInArea = getNotesInArea(
      startPoint,
      endPoint,
      this.props.notes,
    );

    this.setState(state => ({
      selectedNoteIds: isAdditive
        ? uniq([...state.selectedNoteIds, ...map('id', notesInArea)])
        : map('id', notesInArea),
    }));
  };

  handleToolbarOctaveDown = () =>
    this.props.onOctaveDown(this.getSelectedNotes());

  handleToolbarOctaveUp = () =>
    this.props.onOctaveUp(this.getSelectedNotes());

  nudge = (delta) => {
    if (isEmpty(this.state.selectedNoteIds)) return;

    if (someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.getSelectedNotes(),
    )) return;

    this.props.onNudge(delta, this.getSelectedNotes());
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
    if (this.props.notes.length === this.state.selectedNoteIds.length) return;

    this.setState({
      selectedNoteIds: map('id', this.props.notes),
    });
  }

  setContentRef = (contentElementRef) => {
    this.contentElementRef = contentElementRef;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}

function toggleInArray(item, array) {
  return includes(item, array)
    ? without([item], array)
    : [...array, item];
}
