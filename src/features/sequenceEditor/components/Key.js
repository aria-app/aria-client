import { includes } from 'lodash/fp';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const KeyLabel = styled('div')(props => ({
  color: props.theme.almostblack,
  display:
    includes('C', props.step.name) && !includes('#', props.step.name)
      ? 'block'
      : 'none',
}));

const StyledKey = styled('div')(props => ({
  alignItems: 'center',
  backgroundColor: includes('#', props.step.name)
    ? transparentize(0.75, props.theme.almostwhite)
    : props.theme.almostwhite,
  boxShadow: `2px 0 0 ${transparentize(
    includes('#', props.step.name) ? 0.9 : 0.5,
    props.theme.almostwhite,
  )}`,
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 36,
  justifyContent: 'center',
  marginBottom: 2,
  marginTop: 2,
  position: 'relative',
  '&::after': {
    backgroundColor: props.theme.primary[2],
    bottom: 0,
    boxShadow: `2px 0 5px ${props.theme.primary[2]}`,
    content: "''",
    display: 'block',
    right: -2,
    opacity: props.isHoveredRow ? 1 : 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 2,
  },
}));

export default class Key extends React.PureComponent {
  static propTypes = {
    isHoveredRow: PropTypes.bool,
    onMouseDown: PropTypes.func,
    step: PropTypes.object,
    style: PropTypes.object,
  };

  render() {
    return (
      <StyledKey
        isHoveredRow={this.props.isHoveredRow}
        onMouseDown={this.handleMouseDown}
        step={this.props.step}
        style={this.props.style}
      >
        <KeyLabel step={this.props.step}>{this.props.step.name}</KeyLabel>
      </StyledKey>
    );
  }

  handleMouseDown = () => this.props.onMouseDown(this.props.step);
}
