import { compose, first, split } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Note } from '../Note/Note';
import './DrawLayer.scss';

const { showIf } = shared.helpers;
const noop = () => {};

export class DrawLayer extends React.PureComponent {
  static propTypes = {
    mousePoint: PropTypes.object.isRequired,
    onDraw: PropTypes.func.isRequired,
    toolType: PropTypes.string.isRequired,
  }

  state = {
    isDrawing: false,
  }

  render() {
    return h('.draw-layer', {
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      ref: this.setRef,
      style: {
        pointerEvents: this.getIsEnabled() ? 'all' : 'none',
      },
    }, [
      showIf(this.getIsEnabled())(
        h(Note, {
          className: 'draw-layer__note--ghost',
          onErase: noop,
          onMoveStart: noop,
          onResizeStart: noop,
          onSelect: noop,
          note: this.getGhostNoteNote(),
          selectedNotes: [],
          toolType: '',
        }),
      ),
    ]);
  }

  getGhostNoteNote() {
    const point = this.props.mousePoint;
    return {
      points: [
        {
          x: point ? point.x : 0,
          y: point ? point.y : 0,
        },
        {
          x: point ? point.x + 1 : 0,
          y: point ? point.y : 0,
        },
      ],
    };
  }

  getIsDrawing = () => this.state.isDrawing;

  getIsEnabled = () =>
    this.props.toolType === shared.constants.toolTypes.DRAW;

  handleMouseDown = () => {
    this.setState({
      isDrawing: true,
    });
  }

  handleMouseLeave = (e) => {
    if (!this.getIsDrawing()) return;

    const primaryClassName = `.${compose(first, split(' '))(e.target.className)}`;
    const isDescendant = !!this.elementRef.querySelector(primaryClassName);
    if (isDescendant) return;

    this.setState({
      isDrawing: false,
    });
  }

  handleMouseUp = () => {
    if (!this.getIsDrawing()) return;
    const point = this.props.mousePoint;
    this.props.onDraw(point);
    this.setState({
      isDrawing: false,
    });
  }

  setRef = (ref) => {
    this.elementRef = ref;
  }
}
