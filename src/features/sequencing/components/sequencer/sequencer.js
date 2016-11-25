import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import shared from '../../../shared';
import { GridContainer } from '../grid/grid-container';
import { KeysContainer } from '../keys/keys-container';
import './sequencer.scss';

const { DropdownList, IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = shared.constants.toolTypes;

export class Sequencer extends React.Component {
  static propTypes = {
    closeSequence: React.PropTypes.func.isRequired,
    deleteSelectedNotes: React.PropTypes.func.isRequired,
    duplicate: React.PropTypes.func.isRequired,
    isSelectingActive: React.PropTypes.bool,
    resizeSelected: React.PropTypes.func.isRequired,
    scrolledVertically: React.PropTypes.func.isRequired,
    selectTool: React.PropTypes.func.isRequired,
    shiftDownOctave: React.PropTypes.func.isRequired,
    shiftUpOctave: React.PropTypes.func.isRequired,
    style: StylePropType,
    toolType: React.PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.contentRef.scrollTop = getCenteredScroll(
      this.contentRef,
    );
  }

  render() {
    return h('.sequencer', {
      style: this.props.style,
    }, [
      h(Toolbar, {
        className: '.sequencer__toolbar',
        isAlternate: this.props.isSelectingActive,
        alternateLeftItems: [
          h(IconButton, {
            icon: 'trash',
            toolTip: 'Delete',
            onClick: () => this.props.deleteSelectedNotes(),
          }),
          h(IconButton, {
            icon: 'clone',
            toolTip: 'Duplicate',
            onClick: () => this.props.duplicate(),
          }),
          h(IconButton, {
            icon: 'arrow-up',
            toolTip: 'Up Octave',
            onClick: () => this.props.shiftUpOctave(),
          }),
          h(IconButton, {
            icon: 'arrow-down',
            toolTip: 'Down Octave',
            onClick: () => this.props.shiftDownOctave(),
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
            onSelectedItemChange: this.handleResizeDropdownSelectedItemChange,
          }),
          h(IconButton, {
            icon: 'close',
            onClick: this.close,
          }),
        ],
        leftItems: [
          h(IconButton, {
            isActive: this.props.toolType === SELECT,
            icon: 'mouse-pointer',
            onClick: () => this.props.selectTool(SELECT),
          }),
          h(IconButton, {
            isActive: this.props.toolType === DRAW,
            icon: 'pencil',
            onClick: () => this.props.selectTool(DRAW),
          }),
          h(IconButton, {
            isActive: this.props.toolType === ERASE,
            icon: 'eraser',
            onClick: () => this.props.selectTool(ERASE),
          }),
          h(IconButton, {
            isActive: this.props.toolType === PAN,
            icon: 'hand-paper-o',
            onClick: () => this.props.selectTool(PAN),
          }),
        ],
        rightItems: [
          h(IconButton, {
            icon: 'close',
            onClick: this.close,
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

  close = () => {
    this.props.closeSequence();
  }

  handleResizeDropdownSelectedItemChange = (item) => {
    this.props.resizeSelected(item);
  }

  onContentScroll = (e) => {
    this.props.scrolledVertically(Math.floor(e.target.scrollTop / 40));
  }

  setContentRef = (ref) => {
    this.contentRef = ref;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}
