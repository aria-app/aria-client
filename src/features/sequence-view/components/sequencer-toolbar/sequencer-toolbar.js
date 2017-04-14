import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './sequencer-toolbar.scss';

const { DropdownList, IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;

export class SequencerToolbar extends React.Component {
  static propTypes = {
    areSomeNotesSelected: React.PropTypes.bool.isRequired,
    onSelectedNotesDelete: React.PropTypes.func.isRequired,
    onSelectedNotesDuplicate: React.PropTypes.func.isRequired,
    onSelectedNotesOctaveDown: React.PropTypes.func.isRequired,
    onSelectedNotesOctaveUp: React.PropTypes.func.isRequired,
    onSelectedNotesResize: React.PropTypes.func.isRequired,
    onSequenceClose: React.PropTypes.func.isRequired,
    onToolSelect: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  render() {
    return h(Toolbar, {
      className: 'sequencer-toolbar',
      isAlternate: this.props.areSomeNotesSelected,
      alternateLeftItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__delete-button',
          icon: 'trash',
          onClick: this.props.onSelectedNotesDelete,
          toolTip: 'Delete',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__duplicate-button',
          icon: 'clone',
          onClick: this.props.onSelectedNotesDuplicate,
          toolTip: 'Duplicate',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__octave-up-button',
          icon: 'arrow-up',
          onClick: this.props.onSelectedNotesOctaveUp,
          toolTip: 'Octave up',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__octave-down-button',
          icon: 'arrow-down',
          onClick: this.props.onSelectedNotesOctaveDown,
          toolTip: 'Octave down',
        }),
      ],
      alternateRightItems: [
        h(DropdownList, {
          className: 'sequencer__toolbar__resize-dropdown',
          icon: 'long-arrow-right',
          items: getResizeLengths(),
          onSelectedIdChange: this.handleToolbarResizeDropdownSelectedIdChange,
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__close-button',
          icon: 'close',
          onClick: this.props.onSequenceClose,
          toolTip: 'Back to tracks',
        }),
      ],
      leftItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__select-tool-button',
          isActive: this.props.toolType === SELECT,
          icon: 'mouse-pointer',
          onClick: this.handleToolbarSelectToolButtonClick,
          toolTip: 'Select',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__draw-tool-button',
          isActive: this.props.toolType === DRAW,
          icon: 'pencil',
          onClick: this.handleToolbarDrawToolButtonClick,
          toolTip: 'Draw',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__erase-tool-button',
          isActive: this.props.toolType === ERASE,
          icon: 'eraser',
          onClick: this.handleToolbarEraseToolButtonClick,
          toolTip: 'Erase',
        }),
        h(IconButton, {
          className: 'sequencer__toolbar__pan-tool-button',
          isActive: this.props.toolType === PAN,
          icon: 'hand-paper-o',
          onClick: this.handleToolbarPanToolButtonClick,
          toolTip: 'Pan',
        }),
      ],
      rightItems: [
        h(IconButton, {
          className: 'sequencer__toolbar__close-button',
          icon: 'close',
          onClick: this.props.onSequenceClose,
          toolTip: 'Back to tracks',
        }),
      ],
    });
  }

  handleToolbarDrawToolButtonClick = () => {
    this.props.onToolSelect(DRAW);
  }

  handleToolbarEraseToolButtonClick = () => {
    this.props.onToolSelect(ERASE);
  }

  handleToolbarPanToolButtonClick = () => {
    this.props.onToolSelect(PAN);
  }

  handleToolbarResizeDropdownSelectedIdChange = (length) => {
    this.props.onSelectedNotesResize(length);
  }

  handleToolbarSelectToolButtonClick = () => {
    this.props.onToolSelect(SELECT);
  }
}

export function getResizeLengths() {
  return [
    { text: '1/32', id: 1 },
    { text: '1/16', id: 2 },
    { text: '1/8', id: 4 },
    { text: '1/4', id: 8 },
    { text: '1/2', id: 16 },
    { text: '1', id: 32 },
  ];
}
