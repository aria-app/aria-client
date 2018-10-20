import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';
import h from 'react-hyperscript';
import './Box.scss';

export class Box extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      l: PropTypes.number,
    }),
    onItemChange: PropTypes.func,
    step: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    step: 100,
  };

  render() {
    return h(Draggable, {
      axis: 'x',
      bounds: 'parent',
      grid: [this.props.step, 0],
      // handle: '.box__content',
      key: this.props.item.id,
      onDrag: this.handleDrag,
      position: this.getPosition(),
    }, [
      h('.box', {
        style: this.getStyle(),
      }, [
        h('.box__content', [
          this.props.item.id,
        ]),
        h(Draggable, {
          axis: 'x',
          bounds: {
            left: this.props.step - 16,
          },
          grid: [this.props.step, 0],
          onDrag: this.handleResizerDrag,
          onStart: e => e.stopPropagation(),
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
    x: (this.props.item.l * this.props.step) - 16,
    y: 0,
  });

  getStyle = () => ({
    alignItems: 'center',
    backgroundColor: 'yellow',
    border: '1px dashed red',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: this.props.item.l * this.props.step,
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
      l: Math.max(1, this.props.item.l + (position.deltaX / this.props.step)),
    });
  };
}
