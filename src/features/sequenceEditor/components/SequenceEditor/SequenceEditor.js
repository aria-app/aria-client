import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import uniq from 'lodash/fp/uniq';
import without from 'lodash/fp/without';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { toolTypes } from '../../constants';
import { Grid } from '../Grid/Grid';
import { Keys } from '../Keys/Keys';
import { SequenceEditorToolbar } from '../SequenceEditorToolbar/SequenceEditorToolbar';
import './SequenceEditor.scss';

export class SequenceEditor extends React.PureComponent {
  static propTypes = {
    isRedoEnabled: PropTypes.bool.isRequired,
    isUndoEnabled: PropTypes.bool.isRequired,
    measureCount: PropTypes.number.isRequired,
    noteMap: PropTypes.object.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDraw: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onErase: PropTypes.func.isRequired,
    onNudge: PropTypes.func.isRequired,
    onOctaveDown: PropTypes.func.isRequired,
    onOctaveUp: PropTypes.func.isRequired,
    onPitchPreview: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      previousToolType: toolTypes.SELECT,
      selectedNoteIds: [],
      toolType: toolTypes.SELECT,
    };
  }

  componentDidMount() {
    if (!this.contentElementRef) return;
    this.contentElementRef.scrollTop = getCenteredScroll(
      this.contentElementRef,
    );
  }

  render() {
    return (
      <HotKeys
        className="sequence-editor"
        focused={true}
        handlers={this.getKeyHandlers()}>
        <SequenceEditorToolbar
          isRedoEnabled={this.props.isRedoEnabled}
          isUndoEnabled={this.props.isUndoEnabled}
          measureCount={this.props.measureCount}
          onClose={this.props.onClose}
          onDelete={this.deleteSelectedNotes}
          onDeselectAll={this.deselectAllNotes}
          onDrawToolSelect={this.activateDrawTool}
          onDuplicate={this.duplicateSelectedNotes}
          onEraseToolSelect={this.activateEraseTool}
          onOctaveDown={this.handleToolbarOctaveDown}
          onOctaveUp={this.handleToolbarOctaveUp}
          onPanToolSelect={this.activatePanTool}
          onRedo={this.redo}
          onSelectToolSelect={this.activateSelectTool}
          onUndo={this.undo}
          selectedNotes={this.getSelectedNotes()}
          toolType={this.state.toolType}
        />
        <div
          className="sequence-editor__content"
          ref={this.setContentRef}>
          <div
            className="sequence-editor__content__wrapper">
            <Keys
              onKeyPress={this.props.onPitchPreview}
            />
            <Grid
              measureCount={this.props.measureCount}
              notes={this.props.notes}
              onDrag={this.props.onDrag}
              onDragPreview={this.handleGridDragPreview}
              onDraw={this.handleGridDraw}
              onErase={this.handleGridErase}
              onResize={this.props.onResize}
              onSelect={this.handleGridSelect}
              onSelectInArea={this.handleGridSelectInArea}
              selectedNotes={this.getSelectedNotes()}
              sequenceEditorContentRef={this.contentElementRef}
              toolType={this.state.toolType}
            />
          </div>
        </div>
      </HotKeys>
    );
  }

  activateDrawTool = () => {
    this.setState({
      toolType: toolTypes.DRAW,
    });
  }

  activatePanOverride = (e) => {
    e.preventDefault();
    if (e.repeat) return;
    this.setState(state => ({
      previousToolType: state.toolType,
      toolType: toolTypes.PAN,
    }));
    window.addEventListener('keyup', this.deactivatePanOverride);
  }

  activateEraseTool = () => {
    this.setState({
      toolType: toolTypes.ERASE,
    });
  }

  activatePanTool = () => {
    this.setState({
      toolType: toolTypes.PAN,
    });
  }

  activateSelectTool = () => {
    this.setState({
      toolType: toolTypes.SELECT,
    });
  }

  deactivatePanOverride = (e) => {
    if (e.keyCode !== 32) return;
    this.setState(state => ({
      toolType: state.previousToolType,
    }));
    window.removeEventListener('keyup', this.deactivatePanOverride);
  }

  deleteSelectedNotes = (e) => {
    e.preventDefault();

    if (isEmpty(this.state.selectedNoteIds)) return;

    const selectedNotes = this.getSelectedNotes();

    this.setState({
      selectedNoteIds: [],
    });

    this.props.onDelete(selectedNotes);
  }

  deselectAllNotes = (e) => {
    e.preventDefault();

    if (isEmpty(this.state.selectedNoteIds)) return;

    this.setState({
      selectedNoteIds: [],
    });
  }

  duplicateSelectedNotes = (e) => {
    e.preventDefault();

    if (isEmpty(this.state.selectedNoteIds)) return;

    const duplicatedNotes = Dawww.duplicateNotes(this.getSelectedNotes());

    this.props.onDuplicate(duplicatedNotes);

    this.setState({
      selectedNoteIds: map('id', duplicatedNotes),
    });
  }

  getKeyHandlers = () => ({
    backspace: this.deleteSelectedNotes,
    d: this.activateDrawTool,
    del: this.deleteSelectedNotes,
    down: this.nudgeDown,
    e: this.activateEraseTool,
    left: this.nudgeLeft,
    p: this.activatePanTool,
    right: this.nudgeRight,
    s: this.activateSelectTool,
    space: this.activatePanTool,
    up: this.nudgeUp,
    'ctrl+a': this.selectAll,
    'ctrl+d': this.deselectAllNotes,
    'ctrl+shift+d': this.duplicateSelectedNotes,
    'ctrl+alt+z': this.props.onRedo,
    'ctrl+z': this.props.onUndo,
    'meta+a': this.selectAll,
    'meta+d': this.deselectAllNotes,
    'meta+shift+d': this.duplicateSelectedNotes,
    'meta+alt+z': this.props.onRedo,
    'meta+z': this.props.onUndo,
  });

  getSelectedNotes = () =>
    map(
      id => getOr({}, `props.noteMap.${id}`, this),
      this.state.selectedNoteIds,
    );

  handleGridDragPreview = (notes) => {
    const pitch = getOr(-1, '[0].points[0].y', notes);

    this.props.onPitchPreview(pitch);
  };

  handleGridDraw = (point) => {
    const pitch = getOr(-1, 'y', point);

    this.props.onPitchPreview(pitch);

    this.props.onDraw(point);
  };

  handleGridErase = (note) => {
    this.props.onErase(note);
    this.setState({
      selectedNoteIds: [],
    });
  };

  handleGridSelect = (note, isAdditive) => {
    const pitch = getOr(-1, 'points[0].y', note);

    this.props.onPitchPreview(pitch);

    this.setState(state => ({
      selectedNoteIds: isAdditive
        ? toggleInArray(note.id, state.selectedNoteIds)
        : [note.id],
    }));
  };

  handleGridSelectInArea = (startPoint, endPoint, isAdditive) => {
    const notesInArea = Dawww.getNotesInArea(
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

    if (Dawww.someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.getSelectedNotes(),
    )) return;

    const selectedNotes = this.getSelectedNotes();
    const pitch = getOr(-1, '[0].points[0].y', selectedNotes);

    this.props.onPitchPreview(pitch + delta.y);

    this.props.onNudge(delta, selectedNotes);
  }

  nudgeDown = (e) => {
    e.preventDefault();
    this.nudge({ x: 0, y: 1 });
  }

  nudgeLeft = (e) => {
    e.preventDefault();
    this.nudge({ x: -1, y: 0 });
  }

  nudgeRight = (e) => {
    e.preventDefault();
    this.nudge({ x: 1, y: 0 });
  }

  nudgeUp = (e) => {
    e.preventDefault();
    this.nudge({ x: 0, y: -1 });
  }

  redo = () => {
    if (!this.props.isRedoEnabled) return;

    this.props.onRedo();
  };

  selectAll = () => {
    if (this.props.notes.length === this.state.selectedNoteIds.length) return;

    this.setState({
      selectedNoteIds: map('id', this.props.notes),
    });
  }

  setContentRef = (contentElementRef) => {
    this.contentElementRef = contentElementRef;
    this.forceUpdate();
  }

  undo = () => {
    if (!this.props.isUndoEnabled) return;

    this.props.onUndo();
  };
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}

function toggleInArray(item, array) {
  return includes(item, array)
    ? without([item], array)
    : [...array, item];
}
