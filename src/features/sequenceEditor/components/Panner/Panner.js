import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledPanner = styled.div`
  bottom: 0;
  cursor: grab;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export class Panner extends React.PureComponent {
  static propTypes = {
    onScrollLeftChange: PropTypes.func.isRequired,
    onScrollTopChange: PropTypes.func.isRequired,
    scrollLeftEl: PropTypes.object,
    scrollTopEl: PropTypes.object,
  }

  state = {
    startPoint: {},
  }

  render() {
    return (
      <StyledPanner
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      />
    );
  }

  getIsPanning = () => !isEmpty(this.state.startPoint);

  getStartPoint(e) {
    return {
      scrollLeft: this.props.scrollLeftEl.scrollLeft,
      scrollTop: this.props.scrollTopEl.scrollTop,
      x: e.pageX,
      y: e.pageY,
    };
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      startPoint: this.getStartPoint(e),
    });
  }

  handleMouseLeave = () => {
    if (!this.getIsPanning()) return;
    this.setState({
      startPoint: {},
    });
  }

  handleMouseMove = (e) => {
    if (!this.getIsPanning()) return;
    const dx = e.pageX - this.state.startPoint.x;
    const dy = e.pageY - this.state.startPoint.y;

    this.props.onScrollLeftChange(this.state.startPoint.scrollLeft - dx);
    this.props.onScrollTopChange(this.state.startPoint.scrollTop - dy);
  }

  handleMouseUp = () => {
    if (!this.getIsPanning()) return;
    this.setState({
      startPoint: {},
    });
  }
}
