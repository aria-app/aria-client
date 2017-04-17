import { isEmpty } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import './panner.scss';

export class Panner extends React.PureComponent {
  static propTypes = {
    isEnabled: React.PropTypes.bool.isRequired,
    onScrollLeftChange: React.PropTypes.func.isRequired,
    onScrollTopChange: React.PropTypes.func.isRequired,
    scrollLeftEl: React.PropTypes.object,
    scrollTopEl: React.PropTypes.object,
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
        pointerEvents: this.props.isEnabled ? 'all' : 'none',
      },
    });
  }

  getClassName = () => classnames({
    'panner--grab': this.props.isEnabled,
  });

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
    if (!this.props.isEnabled) return;
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
