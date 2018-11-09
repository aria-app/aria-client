import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { Box } from '../Box/Box';
import './Boxes.scss';

export class Boxes extends React.Component {
  static propTypes = {
    boxContentComponent: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      length: PropTypes.number,
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
          contentComponent: this.props.boxContentComponent,
          key: item.id,
          onItemChange: this.handleBoxItemChange,
          step: this.props.step,
          item,
        }),
      ),
    ]);
  }

  getStyle = () => ({
    position: 'relative',
    width: this.props.length * this.props.step,
    ...this.props.style,
  });

  handleBoxItemChange = (draggedItem) => {
    this.setState({
      draggedItemId: draggedItem.id,
    });

    this.props.onItemsChange(this.props.items.map((item) => {
      if (item.id !== draggedItem.id) return item;

      return draggedItem;
    }));
  };
}
