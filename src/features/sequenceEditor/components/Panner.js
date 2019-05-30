import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';

const StyledPanner = styled('div')({
  bottom: 0,
  cursor: 'grab',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});

export default class Panner extends React.PureComponent {
  static propTypes = {
    scrollLeftEl: PropTypes.object,
    scrollTopEl: PropTypes.object,
  };

  state = {
    startPoint: {},
  };

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

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      startPoint: this.getStartPoint(e),
    });
  };

  handleMouseLeave = () => {
    if (!this.getIsPanning()) return;
    this.setState({
      startPoint: {},
    });
  };

  handleMouseMove = e => {
    if (!this.getIsPanning()) return;
    const dx = e.pageX - this.state.startPoint.x;
    const dy = e.pageY - this.state.startPoint.y;
    const scrollLeft = this.state.startPoint.scrollLeft - dx;
    const scrollTop = this.state.startPoint.scrollTop - dy;

    this.props.scrollLeftEl.scrollLeft = scrollLeft;
    this.props.scrollTopEl.scrollTop = scrollTop;
  };

  handleMouseUp = () => {
    if (!this.getIsPanning()) return;
    this.setState({
      startPoint: {},
    });
  };
}
