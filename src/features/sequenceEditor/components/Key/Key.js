import { includes } from 'lodash/fp';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const KeyLabel = styled.div`
  display: ${props => (
    includes('C', props.step.name) &&
    !includes('#', props.step.name)
  ) ? 'block' : 'none'};
`;

const StyledKey = styled.div`
  align-items: center;
  background-color: ${props => includes('#', props.step.name)
    ? transparentize(0.75, props.theme.almostwhite)
    : props.theme.almostwhite};
  box-shadow: 2px 0 0 ${props => transparentize(
    includes('#', props.step.name) ? 0.9 : 0.5,
    props.theme.almostwhite,
  )};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
`;

export class Key extends React.PureComponent {
  static propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    step: PropTypes.object,
    style: PropTypes.object,
  }

  render() {
    return (
      <StyledKey
        onMouseDown={this.handleMouseDown}
        step={this.props.step}
        style={this.props.style}>
        <KeyLabel
          step={this.props.step}>
          {this.props.step.name}
        </KeyLabel>
      </StyledKey>
    );
  }

  handleMouseDown = () =>
    this.props.onMouseDown(this.props.step);
}
