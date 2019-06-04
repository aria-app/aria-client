import classnames from 'classnames';
import { includes } from 'lodash/fp';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    '&::after': {
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      boxShadow: `2px 0 5px ${theme.palette.primary.main}`,
      content: "''",
      display: 'block',
      right: -2,
      opacity: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: 2,
    },
  },
  label: {
    display: 'none',
  },
  c: {
    '& $label': {
      display: 'block',
    },
  },
  hoveredRow: {
    '&::after': {
      opacity: 1,
    },
  },
  sharp: {
    backgroundColor: theme.palette.text.primary,
  },
});

class Key extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    isHoveredRow: PropTypes.bool,
    onMouseDown: PropTypes.func,
    step: PropTypes.object,
    style: PropTypes.object,
  };

  render() {
    return (
      <div
        className={this.getClassName()}
        onMouseDown={this.handleMouseDown}
        style={this.props.style}
      >
        <div className={this.props.classes.label} step={this.props.step}>
          {this.props.step.name}
        </div>
      </div>
    );
  }

  getClassName = () =>
    classnames(
      this.props.classes.root,
      {
        [this.props.classes.c]:
          includes('C', this.props.step.name) &&
          !includes('#', this.props.step.name),
        [this.props.classes.hoveredRow]: this.props.isHoveredRow,
        [this.props.classes.sharp]: includes('#', this.props.step.name),
      },
      this.props.className,
    );

  handleMouseDown = () => this.props.onMouseDown(this.props.step);
}

export default withStyles(styles)(Key);
