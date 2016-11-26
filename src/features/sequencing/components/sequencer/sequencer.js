import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { GridContainer } from '../grid/grid-container';
import { KeysContainer } from '../keys/keys-container';
import './sequencer.scss';

const { DropdownList, IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;

export class Sequencer extends React.Component {
  static propTypes = {
    isSelectingActive: React.PropTypes.bool,
    onDuplicate: React.PropTypes.func.isRequired,
    onResizeSelected: React.PropTypes.func.isRequired,
    onSelectedNotesDelete: React.PropTypes.func.isRequired,
    onSequenceClose: React.PropTypes.func.isRequired,
    onShiftOctaveDown: React.PropTypes.func.isRequired,
    onShiftOctaveUp: React.PropTypes.func.isRequired,
    onToolSelect: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  componentDidMount() {
    if (!this.contentRef) return;
    this.contentRef.scrollTop = getCenteredScroll(
      this.contentRef,
    );
  }

  render() {
    return h('.sequencer', [
      h(Toolbar, {
        className: '.sequencer__toolbar',
        isAlternate: this.props.isSelectingActive,
        alternateLeftItems: [
          h(IconButton, {
            className: '.sequencer__toolbar__delete-button',
            icon: 'trash',
            toolTip: 'Delete',
            onClick: this.props.onSelectedNotesDelete,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__duplicate-button',
            icon: 'clone',
            toolTip: 'Duplicate',
            onClick: this.props.onDuplicate,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__up-octave-button',
            icon: 'arrow-up',
            toolTip: 'Up Octave',
            onClick: this.props.onShiftOctaveUp,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__down-octave-button',
            icon: 'arrow-down',
            toolTip: 'Down Octave',
            onClick: this.props.onShiftOctaveDown,
          }),
        ],
        alternateRightItems: [
          h(DropdownList, {
            className: 'sequencer__toolbar__resize-dropdown',
            icon: 'long-arrow-right',
            items: [
              { text: '1/32', id: 1 },
              { text: '1/16', id: 2 },
              { text: '1/8', id: 4 },
              { text: '1/4', id: 8 },
              { text: '1/2', id: 16 },
              { text: '1', id: 32 },
            ],
            onSelectedIdChange: this.handleToolbarResizeDropdownSelectedIdChange,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__close-button',
            icon: 'close',
            onClick: this.handleToolbarCloseButtonClick,
          }),
        ],
        leftItems: [
          h(IconButton, {
            className: '.sequencer__toolbar__select-tool-button',
            isActive: this.props.toolType === SELECT,
            icon: 'mouse-pointer',
            onClick: this.handleToolbarSelectToolButtonClick,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__draw-tool-button',
            isActive: this.props.toolType === DRAW,
            icon: 'pencil',
            onClick: this.handleToolbarDrawToolButtonClick,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__erase-tool-button',
            isActive: this.props.toolType === ERASE,
            icon: 'eraser',
            onClick: this.handleToolbarEraseToolButtonClick,
          }),
          h(IconButton, {
            className: '.sequencer__toolbar__pan-tool-button',
            isActive: this.props.toolType === PAN,
            icon: 'hand-paper-o',
            onClick: this.handleToolbarPanToolButtonClick,
          }),
        ],
        rightItems: [
          h(IconButton, {
            className: '.sequencer__toolbar__close-button',
            icon: 'close',
            onClick: this.handleToolbarCloseButtonClick,
          }),
        ],
      }),
      h('.sequencer__content', {
        onScroll: this.onContentScroll,
        ref: this.setContentRef,
      }, [
        h('.sequencer__content__wrapper', [
          h(KeysContainer),
          h(GridContainer, {
            sequencerContentRef: this.contentRef,
          }),
        ]),
      ]),
    ]);
  }

  handleToolbarCloseButtonClick = () => {
    this.props.onSequenceClose();
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
    this.props.onResizeSelected(length);
  }

  handleToolbarSelectToolButtonClick = () => {
    this.props.onToolSelect(SELECT);
  }

  onContentScroll = (e) => {
    this.props.onVerticalScroll(Math.floor(e.target.scrollTop / 40));
  }

  setContentRef = (ref) => {
    this.contentRef = ref;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}
