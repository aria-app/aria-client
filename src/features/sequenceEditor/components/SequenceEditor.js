import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import uniq from 'lodash/fp/uniq';
import withStyles from '@material-ui/styles/withStyles';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import audio from '../../audio';
import shared from '../../shared';
import { toolTypes } from '../constants';
import Grid from './Grid';
import Keys from './Keys';
import SequenceEditorToolbar from './SequenceEditorToolbar';

const { previewPitch } = audio.helpers;
const { FadeIn, FadeOut, LoadingIndicator } = shared.components;

const getNotesByIds = memoizeOne((notes, ids) =>
  notes.filter(note => includes(note.id, ids)),
);

const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  wrapper: {
    display: 'flex',
    flex: '1 0 auto',
    paddingBottom: 64,
    paddingTop: 64,
  },
};

class SequenceEditor extends React.PureComponent {
  static propTypes = {
    isRedoEnabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isUndoEnabled: PropTypes.bool,
    notes: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
    onDrag: PropTypes.func,
    onDraw: PropTypes.func,
    onDuplicate: PropTypes.func,
    onErase: PropTypes.func,
    onLoad: PropTypes.func,
    onNudge: PropTypes.func,
    onOctaveDown: PropTypes.func,
    onOctaveUp: PropTypes.func,
    onRedo: PropTypes.func,
    onResize: PropTypes.func,
    onUndo: PropTypes.func,
    sequence: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      gridMousePoint: { x: -1, y: -1 },
      previousToolType: toolTypes.SELECT,
      selectedNoteIds: [],
      toolType: toolTypes.SELECT,
    };
  }

  componentDidMount() {
    this.props.onLoad(
      this.props.match.params.songId,
      this.props.match.params.sequenceId,
    );

    if (!this.contentElementRef) return;

    this.contentElementRef.scrollTop = shared.helpers.getCenteredScroll(
      this.contentElementRef,
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sequence === this.props.sequence) return;

    if (!this.contentElementRef) return;

    this.contentElementRef.scrollTop = shared.helpers.getCenteredScroll(
      this.contentElementRef,
    );
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <GlobalHotKeys
          handlers={{
            DELETE: this.deleteSelectedNotes,
            DRAW_TOOL: this.activateDrawTool,
            NUDGE_DOWN: this.nudgeDown,
            ERASE_TOOL: this.activateEraseTool,
            NUDGE_LEFT: this.nudgeLeft,
            PAN_TOOL: this.activatePanTool,
            NUDGE_RIGHT: this.nudgeRight,
            SELECT_TOOL: this.activateSelectTool,
            PAN: this.activatePanOverride,
            NUDGE_UP: this.nudgeUp,
            SELECT_ALL: this.selectAll,
            DESELECT: this.deselectAllNotes,
            DUPLICATE: this.duplicateSelectedNotes,
            REDO: this.props.onRedo,
            UNDO: this.props.onUndo,
          }}
          keyMap={{
            DELETE: ['backspace', 'del'],
            DRAW_TOOL: 'd',
            NUDGE_DOWN: 'down',
            ERASE_TOOL: 'e',
            NUDGE_LEFT: 'left',
            PAN_TOOL: 'p',
            NUDGE_RIGHT: 'right',
            SELECT_TOOL: 's',
            PAN: 'space',
            NUDGE_UP: 'up',
            SELECT_ALL: ['ctrl+a', 'meta+a'],
            DESELECT: ['ctrl+d', 'meta+d'],
            DUPLICATE: ['ctrl+shift+d', 'meta+shift+d'],
            REDO: ['ctrl+alt+z', 'meta+alt+z'],
            UNDO: ['ctrl+z', 'meta+z'],
          }}
        />
        <FadeOut isVisible={this.props.isLoading}>
          <LoadingIndicator>LOADING SONG...</LoadingIndicator>,
        </FadeOut>
        <React.Fragment>
          <div className={this.props.classes.content} ref={this.setContentRef}>
            <FadeIn isVisible={!this.props.isLoading}>
              <div className={this.props.classes.wrapper}>
                <Keys
                  hoveredRow={this.state.gridMousePoint.y}
                  onKeyPress={this.previewPitch}
                />
                <Grid
                  measureCount={this.props.sequence.measureCount}
                  mousePoint={this.state.gridMousePoint}
                  notes={this.props.notes}
                  onDrag={this.props.onDrag}
                  onDragPreview={this.handleGridDragPreview}
                  onDraw={this.handleGridDraw}
                  onErase={this.handleGridErase}
                  onMouseLeave={this.handleGridMouseLeave}
                  onMouseMove={this.handleGridMouseMove}
                  onResize={this.props.onResize}
                  onSelect={this.handleGridSelect}
                  onSelectInArea={this.handleGridSelectInArea}
                  selectedNotes={this.getSelectedNotes()}
                  sequenceEditorContentRef={this.contentElementRef}
                  toolType={this.state.toolType}
                />
              </div>
            </FadeIn>
          </div>
          <SequenceEditorToolbar
            isRedoEnabled={this.props.isRedoEnabled}
            isUndoEnabled={this.props.isUndoEnabled}
            measureCount={this.props.sequence.measureCount}
            onClose={this.close}
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
        </React.Fragment>
      </div>
    );
  }

  activateDrawTool = () => {
    this.setState({
      toolType: toolTypes.DRAW,
    });
  };

  activatePanOverride = e => {
    e.preventDefault();

    if (e.repeat) return;

    this.setState(state => ({
      previousToolType: state.toolType,
      toolType: toolTypes.PAN,
    }));

    window.addEventListener('keyup', this.deactivatePanOverride);
  };

  activateEraseTool = () => {
    this.setState({
      toolType: toolTypes.ERASE,
    });
  };

  activatePanTool = () => {
    this.setState({
      toolType: toolTypes.PAN,
    });
  };

  activateSelectTool = () => {
    this.setState({
      toolType: toolTypes.SELECT,
    });
  };

  close = () => {
    this.props.history.push(`/song/${this.props.match.params.songId}`);
  };

  deactivatePanOverride = e => {
    if (e.keyCode !== 32) return;

    this.setState(state => ({
      toolType: state.previousToolType,
    }));

    window.removeEventListener('keyup', this.deactivatePanOverride);
  };

  deleteSelectedNotes = e => {
    e.preventDefault();

    if (isEmpty(this.getSelectedNotes())) return;

    this.props.onDelete(this.getSelectedNotes());

    this.setState({
      selectedNoteIds: [],
    });
  };

  deselectAllNotes = e => {
    e.preventDefault();

    if (isEmpty(this.getSelectedNotes())) return;

    this.setState({
      selectedNoteIds: [],
    });
  };

  duplicateSelectedNotes = e => {
    e.preventDefault();

    if (isEmpty(this.getSelectedNotes())) return;

    const duplicatedNotes = Dawww.duplicateNotes(this.getSelectedNotes());

    this.props.onDuplicate(duplicatedNotes);

    this.setState({
      selectedNoteIds: duplicatedNotes.map(note => note.id),
    });
  };

  getSelectedNotes = () =>
    getNotesByIds(this.props.notes, this.state.selectedNoteIds);

  handleGridDragPreview = notes => {
    const pitch = getOr(-1, '[0].points[0].y', notes);

    this.previewPitch(pitch);
  };

  handleGridDraw = point => {
    const pitch = getOr(-1, 'y', point);

    this.previewPitch(pitch);

    this.props.onDraw(point);
  };

  handleGridErase = note => {
    this.props.onErase(note);
    this.setState({
      selectedNoteIds: [],
    });
  };

  handleGridMouseLeave = e => {
    this.setState({
      gridMousePoint: {
        x: -1,
        y: -1,
      },
    });
  };

  handleGridMouseMove = e => {
    const gridMousePoint = getGridMousePoint(
      e.currentTarget,
      this.contentElementRef,
      e,
    );

    this.setState(state =>
      isEqual(state.gridMousePoint, gridMousePoint) ? null : { gridMousePoint },
    );
  };

  handleGridSelect = (note, isAdditive) => {
    const pitch = getOr(-1, 'points[0].y', note);

    this.previewPitch(pitch);

    this.setState(state => ({
      selectedNoteIds: isAdditive
        ? shared.helpers.toggleInArray(note.id, state.selectedNoteIds)
        : [note.id],
    }));
  };

  handleGridSelectInArea = (startPoint, endPoint, isAdditive) => {
    const notesInArea = Dawww.getNotesInArea(
      startPoint,
      endPoint,
      this.props.notes,
    );

    if (isEmpty(notesInArea)) {
      this.setState(state =>
        isEmpty(state.selectedNoteIds) ? null : { selectedNoteIds: [] },
      );
      return;
    }

    this.setState(state => ({
      selectedNoteIds: isAdditive
        ? uniq([...state.selectedNoteIds, ...notesInArea.map(note => note.id)])
        : notesInArea.map(note => note.id),
    }));
  };

  handleToolbarOctaveDown = () =>
    this.props.onOctaveDown(this.getSelectedNotes());

  handleToolbarOctaveUp = () => this.props.onOctaveUp(this.getSelectedNotes());

  nudge = delta => {
    if (isEmpty(this.getSelectedNotes())) return;

    const notes = this.props.notes.filter(note =>
      includes(
        note.id,
        this.getSelectedNotes().map(selectedNote => selectedNote.id),
      ),
    );

    if (
      Dawww.someNoteWillMoveOutside(
        this.props.sequence.measureCount,
        delta,
        notes,
      )
    )
      return;

    if (delta.y !== 0) {
      const pitch = getOr(-1, '[0].points[0].y', notes);

      this.previewPitch(pitch + delta.y);
    }

    this.props.onNudge(delta, notes);
  };

  nudgeDown = e => {
    e.preventDefault();
    this.nudge({ x: 0, y: 1 });
  };

  nudgeLeft = e => {
    e.preventDefault();
    this.nudge({ x: -1, y: 0 });
  };

  nudgeRight = e => {
    e.preventDefault();
    this.nudge({ x: 1, y: 0 });
  };

  nudgeUp = e => {
    e.preventDefault();
    this.nudge({ x: 0, y: -1 });
  };

  previewPitch = pitch => {
    previewPitch(this.props.sequence.trackId, pitch);
  };

  redo = () => {
    if (!this.props.isRedoEnabled) return;

    this.props.onRedo();
  };

  selectAll = () => {
    if (this.props.notes.length === this.getSelectedNotes().length) return;

    this.setState({
      selectedNoteIds: this.props.notes.map(note => note.id),
    });
  };

  setContentRef = contentElementRef => {
    this.contentElementRef = contentElementRef;
    this.forceUpdate();
  };

  undo = () => {
    if (!this.props.isUndoEnabled) return;

    this.props.onUndo();
  };
}

export default withStyles(styles)(SequenceEditor);

function getGridMousePoint(scrollLeftEl, scrollTopEl, e) {
  const styleOffset = 80;
  const x = e.pageX || 0;
  const y = e.pageY || 0;
  const offsetLeft = scrollLeftEl.offsetLeft || 0;
  const offsetTop = scrollLeftEl.offsetTop || 0;
  const scrollLeft = scrollLeftEl.scrollLeft || 0;
  const scrollTop = scrollTopEl.scrollTop || 0;

  return {
    x: toSlotNumber(x - offsetLeft + scrollLeft - styleOffset),
    y: toSlotNumber(y - offsetTop + scrollTop),
  };
}

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
