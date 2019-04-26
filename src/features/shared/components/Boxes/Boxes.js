import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Box } from '../Box/Box';

const StyledBoxes = styled.div`
  position: relative;
  width: ${props => props.length * props.step}px;
`;

export class Boxes extends React.Component {
  static propTypes = {
    boxContentComponent: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      length: PropTypes.number,
    })),
    length: PropTypes.number,
    onItemsChange: PropTypes.func,
    step: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    length: 0,
    step: 100,
    style: {},
  };

  state = {
    draggedItemId: '',
  };

  render() {
    return (
      <StyledBoxes
        length={this.props.length}
        step={this.props.step}
        style={this.props.style}>
        {this.getBoxes().map(item => (
          <Box
            contentComponent={this.props.boxContentComponent}
            key={item.id}
            onItemChange={this.handleBoxItemChange}
            step={this.props.step}
            item={item}
          />
        ))}
      </StyledBoxes>
    );
  }

  getBoxes = () =>
    this.props.items.filter(i => i.x < this.props.length)

  handleBoxItemChange = (draggedItem) => {
    this.setState({
      draggedItemId: draggedItem.id,
    });

    this.props.onItemsChange(this.props.items.map((item) => {
      if (item.id !== draggedItem.id) return item;

      return draggedItem;
    }));
  };
}
