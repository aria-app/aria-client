import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const StyledFence = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  border: '2px solid white',
  borderRadius: 2,
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
});

export default class Fence extends React.PureComponent {
  static propTypes = {
    endPoint: PropTypes.object,
    startPoint: PropTypes.object,
  };

  render() {
    return (
      <StyledFence
        style={{
          display: this.getDisplay(),
          height: this.getHeight(),
          transform: this.getTransform(),
          width: this.getWidth(),
        }}
      />
    );
  }

  getDisplay() {
    const isSelecting = this.getIsSelecting();
    const start = this.props.startPoint;
    const end = this.props.endPoint;
    const hasMoved = !isEqual(start, end);
    return isSelecting && hasMoved ? 'block' : 'none';
  }

  getHeight() {
    const start = this.props.startPoint;
    const end = this.props.endPoint;

    if (isEmpty(start) || isEmpty(end)) return 0;
    return (Math.abs(this.props.endPoint.y - start.y) + 1) * 40;
  }

  getIsSelecting = () => !isEmpty(this.props.startPoint);

  getTransform() {
    const start = this.props.startPoint;
    const end = this.props.endPoint;

    if (isEmpty(start) || isEmpty(end)) {
      return 'translate(0px, 0px)';
    }

    const x = Math.min(start.x, end.x) * 40;
    const y = Math.min(start.y, end.y) * 40;

    return `translate(${x}px, ${y}px)`;
  }

  getWidth() {
    const start = this.props.startPoint;
    const end = this.props.endPoint;

    if (isEmpty(start) || isEmpty(end)) return 0;
    return (Math.abs(end.x - start.x) + 1) * 40;
  }
}
