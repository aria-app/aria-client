import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import * as constants from '../../constants';
import { Fence } from '../Fence/Fence';
import './Selector.scss';

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
    return (
      <div
        className="selector"
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        style={{
          pointerEvents: this.getIsEnabled() ? 'all' : 'none',
        }}>
        <React.Fragment>
          {this.props.children}
          <Fence
            endPoint={this.props.mousePoint}
            startPoint={this.state.startPoint}
          />
        </React.Fragment>
      </div>
    );
  }

  getIsEnabled = () =>
    this.props.toolType === constants.toolTypes.SELECT;

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
