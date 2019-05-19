import Dawww from 'dawww';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import shared from '../../shared';
import * as constants from '../constants';

const { IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

export default class SequenceEditorToolbar extends React.PureComponent {
  static propTypes = {
    isRedoEnabled: PropTypes.bool,
    isUndoEnabled: PropTypes.bool,
    measureCount: PropTypes.number,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    onDeselectAll: PropTypes.func,
    onDrawToolSelect: PropTypes.func,
    onDuplicate: PropTypes.func,
    onEraseToolSelect: PropTypes.func,
    onOctaveDown: PropTypes.func,
    onOctaveUp: PropTypes.func,
    onPanToolSelect: PropTypes.func,
    onRedo: PropTypes.func,
    onSelectToolSelect: PropTypes.func,
    onUndo: PropTypes.func,
    selectedNotes: PropTypes.arrayOf(PropTypes.object),
    toolType: PropTypes.string,
  };

  render() {
    return (
      <Toolbar
        className="sequence-editor-toolbar"
        isAlternate={this.getAreSomeNotesSelected()}
        leftItems={
          <React.Fragment>
            <IconButton
              icon="arrow-left"
              onClick={this.props.onClose}
              toolTip="Back to tracks"
            />
          </React.Fragment>
        }
        leftItemsAlt={
          <React.Fragment>
            <IconButton
              icon="close"
              onClick={this.props.onDeselectAll}
              toolTip="Deselect notes"
            />
          </React.Fragment>
        }
        rightItems={
          <React.Fragment>
            <IconButton
              icon="undo"
              isDisabled={!this.props.isUndoEnabled}
              onClick={this.props.onUndo}
              title="Undo"
            />
            <IconButton
              icon="redo"
              isDisabled={!this.props.isRedoEnabled}
              onClick={this.props.onRedo}
              title="Redo"
            />
            <IconButton
              isActive={this.props.toolType === SELECT}
              icon="mouse-pointer"
              onClick={this.props.onSelectToolSelect}
              title="Select"
            />
            <IconButton
              isActive={this.props.toolType === DRAW}
              icon="pencil"
              onClick={this.props.onDrawToolSelect}
              title="Draw"
            />
            <IconButton
              isActive={this.props.toolType === ERASE}
              icon="eraser"
              onClick={this.props.onEraseToolSelect}
              title="Erase"
            />
            <IconButton
              isActive={this.props.toolType === PAN}
              icon="hand-paper-o"
              onClick={this.props.onPanToolSelect}
              title="Pan"
            />
          </React.Fragment>
        }
        rightItemsAlt={
          <React.Fragment>
            <IconButton
              icon="undo"
              isDisabled={!this.props.isUndoEnabled}
              onClick={this.props.onUndo}
              title="Undo"
            />
            <IconButton
              icon="redo"
              isDisabled={!this.props.isRedoEnabled}
              onClick={this.props.onRedo}
              title="Redo"
            />
            <IconButton
              icon="trash"
              onClick={this.props.onDelete}
              title="Delete"
            />
            <IconButton
              icon="clone"
              onClick={this.props.onDuplicate}
              title="Duplicate"
            />
            <IconButton
              icon="arrow-up"
              isDisabled={this.getIsOctaveUpButtonDisabled()}
              onClick={this.props.onOctaveUp}
              toolTip="Octave up"
            />
            <IconButton
              icon="arrow-down"
              isDisabled={this.getIsOctaveDownButtonDisabled()}
              onClick={this.props.onOctaveDown}
              toolTip="Octave down"
            />
          </React.Fragment>
        }
      />
    );
  }

  getAreSomeNotesSelected = () => !isEmpty(this.props.selectedNotes);

  getIsOctaveDownButtonDisabled = () =>
    Dawww.someNoteWillMoveOutside(
      this.props.measureCount,
      { x: 0, y: 12 },
      this.props.selectedNotes,
    );

  getIsOctaveUpButtonDisabled = () =>
    Dawww.someNoteWillMoveOutside(
      this.props.measureCount,
      { x: 0, y: -12 },
      this.props.selectedNotes,
    );
}
