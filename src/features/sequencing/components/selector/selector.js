import { isEmpty } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import { Fence } from '../fence/fence';
import './selector.scss';

export class Selector extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    isEnabled: React.PropTypes.bool.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired,
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
        pointerEvents: this.props.isEnabled ? 'all' : 'none',
      },
    }, [
      this.props.children,
      h(Fence, {
        isSelecting: this.getIsSelecting(),
        endPoint: this.props.mousePoint,
        startPoint: this.state.startPoint,
      }),
    ]);
  }

  getIsSelecting = () => !isEmpty(this.state.startPoint);

  handleMouseDown = () => {
    this.setState({
      startPoint: this.props.mousePoint,
    });
  }

  handleMouseLeave = () => {
    if (!this.getIsSelecting()) return;
    this.setState({
      startPoint: {},
    });
  }

  handleMouseUp = (e) => {
    if (!this.getIsSelecting()) return;
    this.props.onSelect({
      endPoint: this.props.mousePoint,
      isAdditive: e.ctrlKey || e.metaKey,
      startPoint: this.state.startPoint,
    });
    this.setState({
      startPoint: {},
    });
  }
}
