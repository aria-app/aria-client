import isEqual from 'lodash/fp/isEqual';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { DraggableCore } from 'react-draggable';
import Fence from './Fence';

const styles = {
  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
};

class Selector extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    isEnabled: PropTypes.bool,
    onSelect: PropTypes.func,
    scrollLeftEl: PropTypes.object,
    scrollTopEl: PropTypes.object,
  };

  state = {
    endPoint: {},
    startPoint: {},
  };

  render() {
    return (
      <DraggableCore
        grid={[40, 40]}
        onDrag={this.handleDrag}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
      >
        <div
          className={this.props.classes.root}
          style={{
            pointerEvents: this.props.isEnabled ? 'all' : 'none',
          }}
        >
          <Fence
            endPoint={this.state.endPoint}
            startPoint={this.state.startPoint}
          />
        </div>
      </DraggableCore>
    );
  }

  adjustScroll = (e, dragData) => {
    const shouldScrollDown =
      window.innerHeight - e.pageY < 80 + 128 && dragData.deltaY >= 0;
    const shouldScrollLeft = e.pageX < 80 && dragData.deltaX <= 0;
    const shouldScrollRight =
      window.innerWidth - e.pageX < 80 && dragData.deltaX >= 0;
    const shouldScrollUp = e.pageY < 80 && dragData.deltaY <= 0;

    if (shouldScrollDown) {
      this.props.scrollTopEl.scrollTop = this.props.scrollTopEl.scrollTop + 20;
    }

    if (shouldScrollLeft) {
      this.props.scrollLeftEl.scrollLeft =
        this.props.scrollLeftEl.scrollLeft - 20;
    }

    if (shouldScrollRight) {
      this.props.scrollLeftEl.scrollLeft =
        this.props.scrollLeftEl.scrollLeft + 20;
    }

    if (shouldScrollUp) {
      this.props.scrollTopEl.scrollTop = this.props.scrollTopEl.scrollTop - 20;
    }
  };

  handleDrag = (e, dragData) => {
    this.adjustScroll(e, dragData);

    this.setState(state => {
      const newEndPoint = dragDataToGridPoint(dragData);

      if (isEqual(newEndPoint, state.endPoint)) return null;

      return {
        endPoint: newEndPoint,
      };
    });
  };

  handleDragStart = (e, dragData) => {
    this.setState({
      startPoint: dragDataToGridPoint(dragData),
    });
  };

  handleDragStop = e => {
    this.props.onSelect(
      this.state.startPoint,
      this.state.endPoint,
      e.ctrlKey || e.metaKey,
    );

    this.setState({
      endPoint: {},
      startPoint: {},
    });
  };
}

export default withStyles(styles)(Selector);

function dragDataToGridPoint(dragData) {
  return {
    x: Math.floor(dragData.x / 40),
    y: Math.floor(dragData.y / 40),
  };
}
