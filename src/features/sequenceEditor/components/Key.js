import { includes } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';

const KeyLabel = styled(({ step, ...rest }) => <div {...rest} />)(props => ({
  display:
    includes('C', props.step.name) && !includes('#', props.step.name)
      ? 'block'
      : 'none',
}));

const StyledKey = styled(({ isHoveredRow, step, ...rest }) => (
  <div {...rest} />
))(props => ({
  alignItems: 'center',
  backgroundColor: includes('#', props.step.name)
    ? props.theme.palette.text.primary
    : props.theme.palette.background.paper,
  boxShadow: props.theme.shadows[2],
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 40,
  justifyContent: 'center',
  position: 'relative',
  '&::after': {
    backgroundColor: props.theme.palette.primary.main,
    bottom: 0,
    boxShadow: `2px 0 5px ${props.theme.palette.primary.main}`,
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
