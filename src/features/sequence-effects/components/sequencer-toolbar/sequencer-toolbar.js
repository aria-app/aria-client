import isEmpty from 'lodash/fp/isEmpty';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import song from '../../../song';
import './sequencer-toolbar.scss';

const { IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;
const { someNoteWillMoveOutside } = song.helpers;

export class SequencerToolbar extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onDeselectAll: React.PropTypes.func.isRequired,
    onDrawToolSelect: React.PropTypes.func.isRequired,
    onDuplicate: React.PropTypes.func.isRequired,
    onEraseToolSelect: React.PropTypes.func.isRequired,
    onOctaveDown: React.PropTypes.func.isRequired,
    onOctaveUp: React.PropTypes.func.isRequired,
    onPanToolSelect: React.PropTypes.func.isRequired,
    onSelectToolSelect: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  render() {
    return h(Toolbar, {
      className: 'sequencer-toolbar',
      isAlternate: this.getAreSomeNotesSelected(),
      alternateLeftItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__delete-button',
          icon: 'trash',
          onClick: this.props.onDelete,
          toolTip: 'Delete',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__duplicate-button',
          icon: 'clone',
          onClick: this.props.onDuplicate,
          toolTip: 'Duplicate',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__octave-up-button',
          icon: 'arrow-up',
          isDisabled: this.getIsOctaveUpButtonDisabled(),
          onClick: this.props.onOctaveUp,
          toolTip: 'Octave up',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__octave-down-button',
          icon: 'arrow-down',
          isDisabled: this.getIsOctaveDownButtonDisabled(),
          onClick: this.props.onOctaveDown,
          toolTip: 'Octave down',
        }),
      ],
      alternateRightItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__deselect-button',
          icon: 'close',
          onClick: this.props.onDeselectAll,
          toolTip: 'Deselect notes',
        }),
      ],
      leftItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__select-tool-button',
          isActive: this.props.toolType === SELECT,
          icon: 'mouse-pointer',
          onClick: this.props.onSelectToolSelect,
          toolTip: 'Select',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__draw-tool-button',
          isActive: this.props.toolType === DRAW,
          icon: 'pencil',
          onClick: this.props.onDrawToolSelect,
          toolTip: 'Draw',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__erase-tool-button',
          isActive: this.props.toolType === ERASE,
          icon: 'eraser',
          onClick: this.props.onEraseToolSelect,
          toolTip: 'Erase',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__pan-tool-button',
          isActive: this.props.toolType === PAN,
          icon: 'hand-paper-o',
          onClick: this.props.onPanToolSelect,
          toolTip: 'Pan',
        }),
      ],
      rightItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__close-button',
          icon: 'close',
          onClick: this.props.onClose,
          toolTip: 'Back to tracks',
        }),
      ],
    });
  }

  getAreSomeNotesSelected = () =>
    !isEmpty(this.props.selectedNotes);

  getIsOctaveDownButtonDisabled = () =>
    someNoteWillMoveOutside(
      this.props.measureCount,
      { x: 0, y: 12 },
      this.props.selectedNotes,
    );

  getIsOctaveUpButtonDisabled = () =>
    someNoteWillMoveOutside(
      this.props.measureCount,
      { x: 0, y: -12 },
      this.props.selectedNotes,
    );
}
