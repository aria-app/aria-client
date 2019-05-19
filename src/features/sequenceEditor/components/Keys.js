import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import Key from './Key';

const StyledKeys = styled.div({
  display: 'flex',
  flex: '0 0 auto',
  flexDirection: 'column',
  width: 40,
});

const keyStyles = Dawww.SCALE.reduce((acc, currentStep) => {
  return {
    ...acc,
    [currentStep.y]: {
      borderBottomRightRadius:
        currentStep.y === Dawww.SCALE.length - 1 ? 4 : '',
      boxShadow:
        currentStep.y === Dawww.SCALE.length - 1
          ? '2px 2px 0 rgba(235, 235, 235, 0.5)'
          : '',
      borderTopRightRadius: currentStep.y === 0 ? 4 : '',
    },
  };
}, {});

export default class Keys extends React.PureComponent {
  static propTypes = {
    hoveredRow: PropTypes.number,
    onKeyPress: PropTypes.func,
  };

  render() {
    return (
      <StyledKeys>
        {Dawww.SCALE.map(step => (
          <Key
            isHoveredRow={this.getIsHoveredRow(step)}
            key={step.y}
            onMouseDown={this.handleKeyMouseDown}
            step={step}
            style={keyStyles[step.y]}
          />
        ))}
      </StyledKeys>
    );
  }

  getIsHoveredRow = step => step.y === this.props.hoveredRow;

  handleKeyMouseDown = step => {
    this.props.onKeyPress(step.y);
  };
}
