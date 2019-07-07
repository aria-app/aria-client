import classnames from 'classnames';
import first from 'lodash/fp/first';
import isEqual from 'lodash/fp/isEqual';
import last from 'lodash/fp/last';
import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transition: 'transform 0.1s ease',
  },
  connector: {
    backgroundColor: transparentize(0.5, theme.palette.primary.main),
    height: 12,
    left: 20,
    position: 'absolute',
    top: 14,
    transformOrigin: 'left center',
    transition: 'transform 0.1s ease',
    width: 1,
    zIndex: 100,
  },
  fill: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
    height: 24,
    width: 24,
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
  point: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    height: 40,
    justifyContent: 'center',
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'all',
    position: 'absolute',
    top: 0,
    transition: 'transform 0.1s ease',
    width: 40,
    zIndex: 150,
  },
  selected: {
    zIndex: 300,
    '& $connector': {
      backgroundColor: theme.palette.secondary.main,
    },
    '& $fill': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: `0 0 10px ${transparentize(
        0.5,
        theme.palette.secondary.main,
      )}`,
    },
  },
});

class Note extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    isSelected: PropTypes.bool,
    note: PropTypes.object,
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    onEndPointDrag: PropTypes.func,
    onEndPointDragStart: PropTypes.func,
    onEndPointDragStop: PropTypes.func,
    positionBounds: PropTypes.object,
    sizeBounds: PropTypes.object,
  };

  static defaultProps = {
    onDrag: () => {},
    onDragStart: () => {},
    onDragStop: () => {},
    onEndPointDrag: () => {},
    onEndPointDragStart: () => {},
    onEndPointDragStop: () => {},
  };

  shouldComponentUpdate(nextProps) {
    if (
      isEqual(nextProps.note, this.props.note) &&
      isEqual(nextProps.isSelected, this.props.isSelected)
    )
      return false;

    return true;
  }

  render() {
    const {
      className,
      classes,
      isSelected,
      note,
      onDrag,
      onDragStart,
      onDragStop,
      onEndPointDrag,
      onEndPointDragStart,
      onEndPointDragStop,
      positionBounds,
      sizeBounds,
      ...rest
    } = this.props;

    return (
      <Draggable
        bounds={positionBounds}
        enableUserSelectHack={true}
        grid={[40, 40]}
        handle=".start-point"
        onDrag={this.handleDrag}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
        position={this.getPosition()}
      >
        <div className={this.getClassName()} {...rest}>
          <div className={classnames(classes.point, 'start-point')}>
            <div className={classes.fill} />
          </div>
          <div className={classes.connector} style={this.getConnectorStyle()} />
          <Draggable
            axis="x"
            bounds={sizeBounds}
            grid={[40, 40]}
            onDrag={this.handleEndPointDrag}
            onStart={this.handleEndPointDragStart}
            onStop={this.handleEndPointDragStop}
            position={this.getEndPointPosition()}
          >
            <div className={classes.point} style={this.getEndPointStyle()}>
              <div className={classes.fill} />
            </div>
          </Draggable>
        </div>
      </Draggable>
    );
  }

  getClassName = () =>
    classnames(
      this.props.classes.root,
      {
        [this.props.classes.selected]: this.props.isSelected,
      },
      this.props.className,
    );

  getConnectorStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0 ? sqrt(abs(x ** 2 + y ** 2)) : 0;
    const rotation = x !== 0 ? asin(abs(y / scale)) * (180 / PI) * sign(y) : 0;
    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`,
    };
  }

  getEndPointPosition = () => ({
    x: (this.props.note.points[1].x - this.props.note.points[0].x) * 40,
    y: (this.props.note.points[1].y - this.props.note.points[0].y) * 40,
  });

  getEndPointStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    return {
      display: is32ndNote(this.props.note) ? 'none' : 'flex',
      transform: `translate(${x}px, ${y}px)`,
    };
  }

  getPosition = () => ({
    x: this.props.note.points[0].x * 40,
    y: this.props.note.points[0].y * 40,
  });

  handleDrag = (e, { deltaX, deltaY }) => {
    this.props.onDrag({
      deltaX: Math.round(deltaX / 40),
      deltaY: Math.round(deltaY / 40),
    });
  };

  handleDragStart = e => {
    this.props.onDragStart(this.props.note, e);
  };

  handleDragStop = () => {
    this.props.onDragStop();
  };

  handleEndPointDrag = (e, { deltaX }) => {
    this.props.onEndPointDrag({
      deltaX: Math.round(deltaX / 40),
    });
  };

  handleEndPointDragStart = e => {
    this.props.onEndPointDragStart(this.props.note, e);
  };

  handleEndPointDragStop = () => {
    this.props.onEndPointDragStop();
  };
}

export default withStyles(styles)(Note);

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
