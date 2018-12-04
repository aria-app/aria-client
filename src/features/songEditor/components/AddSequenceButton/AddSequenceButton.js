import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const AddSequenceButtonPlusHorizontal = styled.div`
  background-color: ${props => props.theme.primary[2]};
  height: 1px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 9px;
`;

const AddSequenceButtonPlusVertical = styled.div`
  background-color: ${props => props.theme.primary[2]};
  height: 9px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
`;

const StyledAddSequenceButton = styled.div`
  align-items: center;
  background-color: ${props => transparentize(0.5, props.theme.primary[2])};
  border: 1px solid ${props => props.theme.primary[2]};
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 84px;
  justify-content: center;
  position: absolute;
  width: 64px;
  &:hover:not(:active) {
    background-color: ${props => transparentize(0.4, props.theme.primary[2])};
  }
  &:active {
    background-color: ${props => transparentize(0.6, props.theme.primary[2])};
  }
`;

export class AddSequenceButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
  }

  render() {
    return (
      <StyledAddSequenceButton
        className="add-sequence-button"
        onClick={this.props.onClick}
        style={this.props.style}>
        <AddSequenceButtonPlusVertical
          className="add-sequence-button__plus__vertical"
        />
        <AddSequenceButtonPlusHorizontal
          className="add-sequence-button__plus__horizontal"
        />
      </StyledAddSequenceButton>
    );
  }
}
