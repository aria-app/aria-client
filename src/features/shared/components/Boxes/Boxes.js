import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { Box } from '../Box/Box';
import './Boxes.scss';

export class Boxes extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      l: PropTypes.number,
    })),
    length: PropTypes.number,
    onItemsChange: PropTypes.func,
    step: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    length: 0,
    step: 100,
    style: {},
  };

  state = {
    draggedItemId: '',
  };

  render() {
    return h('.boxes', {
      style: this.getStyle(),
    }, [
      this.props.items.map(item =>
        h(Box, {
          key: item.id,
          onItemChange: this.handleBoxItemChange,
          step: this.props.step,
          item,
        }),
        // h(Draggable, {
        //   axis: 'x',
        //   bounds: 'parent',
        //   grid: [this.props.step, 0],
        //   key: item.id,
        //   onDrag: (e, position) => this.handleBoxDrag(item, position),
        //   position: this.getBoxPosition(item),
        // }, [
        //   h('.box', {
        //     style: this.getBoxStyle(item),
        //   }, [
        //     item.id,
        //   ]),
        // ]),
      ),
    ]);
  }

  getBoxPosition = item => ({
    x: item.x * this.props.step,
    y: 0,
  });

  getBoxStyle = item => ({
    alignItems: 'center',
    backgroundColor: 'yellow',
    border: '1px dashed red',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: item.l * this.props.step,
    zIndex: this.state.draggedItemId === item.id ? 1 : 0,
  });

  getStyle = () => ({
    backgroundColor: 'white',
    display: 'flex',
    height: 100,
    position: 'relative',
    width: this.props.length * this.props.step,
    ...this.props.style,
  });
  // const maxItem = max(this.props.items
  //   .map(i => (i.x * this.props.step) + (i.l * this.props.step)));

  handleBoxItemChange = (draggedItem) => {
    this.setState({
      draggedItemId: draggedItem.id,
    });

    this.props.onItemsChange(this.props.items.map((item) => {
      if (item.id !== draggedItem.id) return item;

      return draggedItem;
    }));
  };

  handleBoxDrag = (draggedItem, newPosition) => {
    // const x = Math.round(newPosition.x / this.props.step) * this.props.step;
    this.props.onItemsChange(this.props.items.map((item) => {
      if (item.id !== draggedItem.id) return item;

      return {
        ...item,
        x: newPosition.x / this.props.step,
      };
    }));
  };
}
