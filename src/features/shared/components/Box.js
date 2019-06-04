import classnames from 'classnames';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'transform 200ms ease',
    zIndex: 100,
  },
  resizer: {
    backgroundColor: 'transparent',
    bottom: '0',
    cursor: 'col-resize',
    left: '0',
    position: 'absolute',
    top: '0',
    width: theme.spacing(2),
    zIndex: '2',
  },
  dragging: {
    zIndex: 200,
  },
});

class Box extends React.PureComponent {
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
    style: {},
  };

  state = {
    isDragging: false,
  };

  render() {
    return (
      <Draggable
        axis="x"
        bounds="parent"
        cancel=".box__resizer"
        grid={[this.props.step, 0]}
        key={this.props.item.id}
        onDrag={this.handleDrag}
        onStart={() => this.setState({ isDragging: true })}
        onStop={() => this.setState({ isDragging: false })}
        position={this.getPosition()}
      >
        <div className={this.props.classes.root} style={this.getStyle()}>
          {React.createElement(this.props.contentComponent, {
            isDragging: this.state.isDragging,
            item: this.props.item,
            step: this.props.step,
          })}
          <Draggable
            axis="x"
            bounds={{
              left: this.props.step - 16,
            }}
            grid={[this.props.step, 0]}
            onDrag={this.handleResizerDrag}
            position={this.getResizerPosition()}
          >
            <div
              className={classnames(this.props.classes.resizer, 'box__resizer')}
            />
          </Draggable>
        </div>
      </Draggable>
    );
  }

  getPosition = () => ({
    x: this.props.item.x * this.props.step,
    y: 0,
  });

  getResizerPosition = () => ({
    x: this.props.item.length * this.props.step - 16,
    y: 0,
  });

  getStyle = () => ({
    width: this.props.item.length * this.props.step,
    ...this.props.style,
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
      length: Math.max(
        1,
        this.props.item.length + position.deltaX / this.props.step,
      ),
    });
  };
}

export default withStyles(styles)(Box);
