import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Fence } from '../fence/fence';
import './selector.scss';

export class Selector extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    mousePoint: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    toolType: PropTypes.string.isRequired,
  }

  state = {
    endPoint: {},
    startPoint: {},
  }

  render() {
    return h('.selector', {
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      style: {
        pointerEvents: this.getIsEnabled() ? 'all' : 'none',
      },
    }, [
      this.props.children,
      h(Fence, {
        endPoint: this.props.mousePoint,
        startPoint: this.state.startPoint,
      }),
    ]);
  }

  getIsEnabled = () =>
    this.props.toolType === shared.constants.toolTypes.SELECT;

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
