import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import Box from './Box';

const styles = {
  root: {
    position: 'relative',
  },
};

class Boxes extends React.Component {
  static propTypes = {
    boxContentComponent: PropTypes.func,
    classes: PropTypes.object,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any,
        x: PropTypes.number,
        length: PropTypes.number,
      }),
    ),
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
    return (
      <div
        className={this.props.classes.root}
        length={this.props.length}
        step={this.props.step}
        style={{
          ...this.props.style,
          width: this.props.length * this.props.step,
        }}
      >
        {this.getBoxes().map(item => (
          <Box
            contentComponent={this.props.boxContentComponent}
            key={item.id}
            onItemChange={this.handleBoxItemChange}
            step={this.props.step}
            item={item}
          />
        ))}
      </div>
    );
  }

  getBoxes = () => this.props.items.filter(i => i.x < this.props.length);

  handleBoxItemChange = draggedItem => {
    this.setState({
      draggedItemId: draggedItem.id,
    });

    this.props.onItemsChange(
      this.props.items.map(item => {
        if (item.id !== draggedItem.id) return item;

        return draggedItem;
      }),
    );
  };
}

export default withStyles(styles)(Boxes);
