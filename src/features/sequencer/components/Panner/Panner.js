import { isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import shared from '../../../shared';
import './Panner.scss';

export class Panner extends React.PureComponent {
  static propTypes = {
    onScrollLeftChange: PropTypes.func.isRequired,
    onScrollTopChange: PropTypes.func.isRequired,
    scrollLeftEl: PropTypes.object,
    scrollTopEl: PropTypes.object,
    toolType: PropTypes.string.isRequired,
  }

  state = {
    startPoint: {},
  }

  render() {
    return h('.panner', {
      className: this.getClassName(),
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      style: {
        pointerEvents: this.getIsEnabled() ? 'all' : 'none',
      },
    });
  }

  getClassName = () => classnames({
    'panner--grab': this.getIsEnabled(),
  });

  getIsPanning = () => !isEmpty(this.state.startPoint);

  getIsEnabled = () =>
    this.props.toolType === shared.constants.toolTypes.PAN;

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
