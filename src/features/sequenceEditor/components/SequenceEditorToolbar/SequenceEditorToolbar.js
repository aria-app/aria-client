import Dawww from 'dawww';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import shared from '../../../shared';
import * as constants from '../../constants';
import './SequenceEditorToolbar.scss';

const { IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

export class SequenceEditorToolbar extends React.PureComponent {
  static propTypes = {
    isRedoEnabled: PropTypes.bool.isRequired,
    isUndoEnabled: PropTypes.bool.isRequired,
    measureCount: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeselectAll: PropTypes.func.isRequired,
    onDrawToolSelect: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onEraseToolSelect: PropTypes.func.isRequired,
    onOctaveDown: PropTypes.func.isRequired,
    onOctaveUp: PropTypes.func.isRequired,
    onPanToolSelect: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onSelectToolSelect: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    toolType: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Toolbar
        className="sequence-editor-toolbar"
        isAlternate={this.getAreSomeNotesSelected()}
        alternateLeftItems={<React.Fragment>
          <IconButton
            icon="close"
            onClick={this.props.onDeselectAll}
            toolTip="Deselect notes"
          />
        </React.Fragment>}
        alternateRightItems={<React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!this.props.isUndoEnabled}
            onClick={this.props.onUndo}
            toolTip="Undo"
          />
          <IconButton
            icon="redo"
            isDisabled={!this.props.isRedoEnabled}
            onClick={this.props.onRedo}
            toolTip="Redo"
          />
          <IconButton
            icon="trash"
            onClick={this.props.onDelete}
            toolTip="Delete"
          />
          <IconButton
            icon="clone"
            onClick={this.props.onDuplicate}
            toolTip="Duplicate"
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
        </React.Fragment>}
        leftItems={<React.Fragment>
          <IconButton
            icon="arrow-left"
            onClick={this.props.onClose}
            toolTip="Back to tracks"
          />
        </React.Fragment>}
        rightItems={<React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!this.props.isUndoEnabled}
            onClick={this.props.onUndo}
            toolTip="Undo"
          />
          <IconButton
            icon="redo"
            isDisabled={!this.props.isRedoEnabled}
            onClick={this.props.onRedo}
            toolTip="Redo"
          />
          <IconButton
            isActive={this.props.toolType === SELECT}
            icon="mouse-pointer"
            onClick={this.props.onSelectToolSelect}
            toolTip="Select"
          />
          <IconButton
            isActive={this.props.toolType === DRAW}
            icon="pencil"
            onClick={this.props.onDrawToolSelect}
            toolTip="Draw"
          />
          <IconButton
            isActive={this.props.toolType === ERASE}
            icon="eraser"
            onClick={this.props.onEraseToolSelect}
            toolTip="Erase"
          />
          <IconButton
            isActive={this.props.toolType === PAN}
            icon="hand-paper-o"
            onClick={this.props.onPanToolSelect}
            toolTip="Pan"
          />
        </React.Fragment>}
      />
    );
  }

  getAreSomeNotesSelected = () =>
    !isEmpty(this.props.selectedNotes);

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
