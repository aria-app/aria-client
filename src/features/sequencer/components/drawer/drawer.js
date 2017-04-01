import { compose, first, split } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Note } from '../note/note';
import './drawer.scss';

const { showIf } = shared.helpers;

export class Drawer extends React.PureComponent {
  static propTypes = {
    isEnabled: React.PropTypes.bool.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    onDraw: React.PropTypes.func.isRequired,
  }

  state = {
    isDrawing: false,
  }

  render() {
    return h('.drawer', {
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      ref: this.setRef,
      style: {
        pointerEvents: this.props.isEnabled ? 'all' : 'none',
      },
    }, [
      showIf(this.props.isEnabled)(
        h(Note, {
          className: 'notes__note--ghost',
          isSelected: false,
          note: this.getGhostNoteNote(),
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
    this.props.onDraw(this.props.mousePoint);
    this.setState({
      isDrawing: false,
    });
  }

  setRef = (ref) => {
    this.elementRef = ref;
  }
}
