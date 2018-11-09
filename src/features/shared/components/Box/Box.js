import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';
import h from 'react-hyperscript';
import './Box.scss';

export class Box extends React.Component {
  static propTypes = {
    contentComponent: PropTypes.func,
    item: PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      length: PropTypes.number,
    }),
    onItemChange: PropTypes.func,
    step: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    contentComponent: () => null,
    step: 100,
  };

  render() {
    return h(Draggable, {
      axis: 'x',
      bounds: 'parent',
      grid: [this.props.step, 0],
      cancel: '.box__resizer',
      key: this.props.item.id,
      onDrag: this.handleDrag,
      position: this.getPosition(),
    }, [
      h('.box', {
        style: this.getStyle(),
      }, [
        h(this.props.contentComponent, {
          item: this.props.item,
          step: this.props.step,
        }),
        h(Draggable, {
          axis: 'x',
          bounds: {
            left: this.props.step - 16,
          },
          grid: [this.props.step, 0],
          onDrag: this.handleResizerDrag,
          position: this.getResizerPosition(),
        }, [
          h('.box__resizer', {
            style: this.getResizerStyle(),
          }),
        ]),
      ]),
    ]);
  }

  getPosition = () => ({
    x: this.props.item.x * this.props.step,
    y: 0,
  });

  getResizerPosition = () => ({
    x: (this.props.item.length * this.props.step) - 16,
    y: 0,
  });

  getStyle = () => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: this.props.item.length * this.props.step,
    ...this.props.style,
  });

  getResizerStyle = () => ({
    backgroundColor: 'transparent',
    bottom: 0,
    cursor: 'col-resize',
    width: 16,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  });

  handleDrag = (e, position) => {
    this.props.onItemChange({
      ...this.props.item,
      x: position.x / this.props.step,
    });
  };

  handleResizerDrag = (e, position) => {
    this.props.onItemChange({
      ...this.props.item,
      length: Math.max(1, this.props.item.length + (position.deltaX / this.props.step)),
    });
  };
}
