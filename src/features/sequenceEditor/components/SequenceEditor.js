import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import uniq from 'lodash/fp/uniq';
import PropTypes from 'prop-types';
import React from 'react';
// import { hideIf } from 'react-render-helpers';
import { HotKeys } from 'react-hotkeys';
import styled from '@material-ui/styles/styled';
import audio from '../../audio';
import shared from '../../shared';
import { toolTypes } from '../constants';
import Grid from './Grid';
import Keys from './Keys';
import SequenceEditorToolbar from './SequenceEditorToolbar';

const { previewPitch } = audio.helpers;
const { FadeIn, FadeOut, LoadingIndicator } = shared.components;

const SequenceEditorContent = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'scroll',
});

const SequenceEditorWrapper = styled('div')({
  display: 'flex',
  flex: '1 0 auto',
  paddingBottom: 64,
  paddingTop: 64,
});

const StyledSequenceEditor = styled(HotKeys)({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

export default class SequenceEditor extends React.PureComponent {
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
    this.focusRef = React.createRef();
    this.state = {
      gridMousePoint: { x: -1, y: -1 },
      previousToolType: toolTypes.SELECT,
      selectedNotes: [],
      toolType: toolTypes.SELECT,
    };
  }

  componentDidMount() {
    this.props.onLoad(
      this.props.match.params.songId,
      this.props.match.params.sequenceId,
    );

    this.focusRef.current.focus();

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
      <StyledSequenceEditor focused={true} handlers={this.getKeyHandlers()}>
        <div ref={this.focusRef} tabIndex={-1} />
        <FadeOut isVisible={this.props.isLoading}>
          <LoadingIndicator>LOADING SONG...</LoadingIndicator>,
        </FadeOut>
        <React.Fragment>
          <SequenceEditorContent ref={this.setContentRef}>
            <FadeIn isVisible={!this.props.isLoading}>
              <SequenceEditorWrapper>
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
                  selectedNotes={this.state.selectedNotes}
                  sequenceEditorContentRef={this.contentElementRef}
                  toolType={this.state.toolType}
                />
              </SequenceEditorWrapper>
            </FadeIn>
          </SequenceEditorContent>
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
            selectedNotes={this.state.selectedNotes}
            toolType={this.state.toolType}
          />
        </React.Fragment>
      </StyledSequenceEditor>
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

    if (isEmpty(this.state.selectedNotes)) return;

    this.props.onDelete(this.state.selectedNotes);

    this.setState({
      selectedNotes: [],
    });
  };

  deselectAllNotes = e => {
    e.preventDefault();

    if (isEmpty(this.state.selectedNotes)) return;

    this.setState({
      selectedNotes: [],
    });
  };

  duplicateSelectedNotes = e => {
    e.preventDefault();

    if (isEmpty(this.state.selectedNotes)) return;

    const duplicatedNotes = Dawww.duplicateNotes(this.state.selectedNotes);

    this.props.onDuplicate(duplicatedNotes);

    this.setState({
      selectedNotes: duplicatedNotes,
    });
  };

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
    space: this.activatePanOverride,
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
      selectedNotes: [],
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
      selectedNotes: isAdditive
        ? shared.helpers.toggleInArray(note, state.selectedNotes)
        : [note],
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
        isEmpty(state.selectedNotes) ? null : { selectedNotes: [] },
      );
      return;
    }

    this.setState(state => ({
      selectedNotes: isAdditive
        ? uniq([...state.selectedNotes, ...notesInArea])
        : notesInArea,
    }));
  };

  handleToolbarOctaveDown = () =>
    this.props.onOctaveDown(this.state.selectedNotes);

  handleToolbarOctaveUp = () => this.props.onOctaveUp(this.state.selectedNotes);

  nudge = delta => {
    if (isEmpty(this.state.selectedNotes)) return;

    const notes = this.props.notes.filter(note =>
      includes(
        note.id,
        this.state.selectedNotes.map(selectedNote => selectedNote.id),
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
    if (this.props.notes.length === this.state.selectedNotes.length) return;

    this.setState({
      selectedNotes: this.props.notes,
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
