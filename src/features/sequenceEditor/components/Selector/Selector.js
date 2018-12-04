import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Fence } from '../Fence/Fence';

const StyledSelector = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export class Selector extends React.PureComponent {
  static propTypes = {
    mousePoint: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  state = {
    endPoint: {},
    startPoint: {},
  }

  render() {
    return (
      <StyledSelector
        className="selector"
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}>
        <React.Fragment>
          {this.props.children}
          <Fence
            endPoint={this.props.mousePoint}
            startPoint={this.state.startPoint}
          />
        </React.Fragment>
      </StyledSelector>
    );
  }

  handleMouseDown = () => {
    this.setState({
      startPoint: this.props.mousePoint,
    });
  }

  handleMouseLeave = () => {
    if (isEmpty(this.state.startPoint)) return;
    this.setState({
      startPoint: {},
    });
  }

  handleMouseUp = (e) => {
    if (isEmpty(this.state.startPoint)) return;

    this.props.onSelect(
      this.state.startPoint,
      e.ctrlKey || e.metaKey,
    );

    this.setState({
      startPoint: {},
    });
  }
}
