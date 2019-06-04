import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import split from 'lodash/fp/split';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import Note from './Note';

const styles = {
  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  ghostNote: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
};

class DrawLayer extends React.PureComponent {
  static propTypes = {
    mousePoint: PropTypes.object,
    onDraw: PropTypes.func,
  };

  state = {
    isMouseOver: false,
    isDrawing: false,
  };

  render() {
    return (
      <div
        className={this.props.classes.root}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        ref={this.setRef}
      >
        {showIf(this.state.isMouseOver)(
          <Note
            className={this.props.classes.ghostNote}
            note={this.getGhostNoteNote()}
          />,
        )}
      </div>
    );
  }

  getGhostNoteNote() {
    const point = this.props.mousePoint;
    return {
      points: [
        {
          x: point ? point.x : 0,
          y: point ? point.y : 0,
        },
        {
          x: point ? point.x + 1 : 0,
          y: point ? point.y : 0,
        },
      ],
    };
  }

  getIsDrawing = () => this.state.isDrawing;

  handleMouseDown = () => {
    this.setState({
      isDrawing: true,
    });
  };

  handleMouseEnter = () => {
    this.setState({
      isMouseOver: true,
    });
  };

  handleMouseLeave = e => {
    this.setState({
      isMouseOver: false,
    });

    if (!this.getIsDrawing()) return;

    const primaryClassName = `.${compose(
      first,
      split(' '),
    )(e.target.className)}`;
    const isDescendant = !!this.elementRef.querySelector(primaryClassName);
    if (isDescendant) return;

    this.setState({
      isDrawing: false,
    });
  };

  handleMouseUp = () => {
    if (!this.getIsDrawing()) return;
    const point = this.props.mousePoint;
    this.props.onDraw(point);
    this.setState({
      isDrawing: false,
    });
  };

  setRef = ref => {
    this.elementRef = ref;
  };
}

export default withStyles(styles)(DrawLayer);
