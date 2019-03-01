import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components/macro';

const BoxResizer = styled.div.attrs({
  className: 'box__resizer',
})`
  background-color: transparent;
  bottom: 0;
  cursor: col-resize;
  left: 0;
  position: absolute;
  top: 0;
  width: ${props => props.theme.margin.m}px;
  z-index: 2;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: ${props => props.length * props.step}px;
`;

export class Box extends React.Component {
  static propTypes = {
    contentComponent: PropTypes.func,
    item: PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      length: PropTypes.number,
    }),
    onItemChange: PropTypes.func,
    step: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    contentComponent: () => null,
    step: 100,
  };

  render() {
    return (
      <Draggable
        axis="x"
        bounds="parent"
        cancel=".box__resizer"
        grid={[this.props.step, 0]}
        key={this.props.item.id}
        onDrag={this.handleDrag}
        position={this.getPosition()}>
        <StyledBox
          length={this.props.item.length}
          step={this.props.step}
          style={this.props.style}>
          {React.createElement(this.props.contentComponent, {
            item: this.props.item,
            step: this.props.step,
          })}
          <Draggable
            axis="x"
            bounds={{
              left: this.props.step - 16,
            }}
            grid={[this.props.step, 0]}
            onDrag={this.handleResizerDrag}
            position={this.getResizerPosition()}>
            <BoxResizer/>
          </Draggable>
        </StyledBox>
      </Draggable>
    );
  }

  getPosition = () => ({
    x: this.props.item.x * this.props.step,
    y: 0,
  });

  getResizerPosition = () => ({
    x: (this.props.item.length * this.props.step) - 16,
    y: 0,
  });

  handleDrag = (e, position) => {
    this.props.onItemChange({
      ...this.props.item,
      x: position.x / this.props.step,
    });
  };

  handleResizerDrag = (e, position) => {
    this.props.onItemChange({
      ...this.props.item,
      length: Math.max(1, this.props.item.length + (position.deltaX / this.props.step)),
    });
  };
}
