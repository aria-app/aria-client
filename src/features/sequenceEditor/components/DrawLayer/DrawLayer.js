import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import noop from 'lodash/fp/noop';
import split from 'lodash/fp/split';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Note } from '../Note/Note';

const DrawLayerGhostNote = styled(Note).attrs({
  className: 'DrawLayerGhostNote',
})`
  opacity: 0.4;
  pointer-events: none;
`;

const StyledDrawLayer = styled.div.attrs({
  className: 'DrawLayer',
})`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export class DrawLayer extends React.PureComponent {
  static propTypes = {
    mousePoint: PropTypes.object.isRequired,
    onDraw: PropTypes.func.isRequired,
  }

  state = {
    isDrawing: false,
  }

  render() {
    return (
      <StyledDrawLayer
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        ref={this.setRef}>
        <DrawLayerGhostNote
          onErase={noop}
          onMoveStart={noop}
          onResizeStart={noop}
          onSelect={noop}
          note={this.getGhostNoteNote()}
        />
      </StyledDrawLayer>
    );
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
    console.log('yo');
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
