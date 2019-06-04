import classnames from 'classnames';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

const styles = theme => ({
  root: {
    alignItems: 'stretch',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    height: 40,
    position: 'relative',
    transform: 'scale(1)',
    transition: 'transform 200ms ease',
    width: 40,
    '&:hover': {
      transform: 'scale(1.2)',
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  background: {
    flex: '1 0 auto',
  },
  iconWrapper: {
    position: 'absolute',
  },
  active: {
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      transform: 'none',
    },
    '& $background': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  disabled: {
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      transform: 'none',
    },
    '& $iconWrapper': {
      opacity: 0.5,
    },
  },
});

class IconButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.string,
    getRef: PropTypes.func,
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
    style: PropTypes.object,
    title: PropTypes.string,
  };

  static defaultProps = {
    iconProps: {},
  };

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={this.handleClick}
        ref={this.props.getRef}
        style={this.props.style}
        title={this.props.title}
      >
        <div className={this.props.classes.background} />
        <div className={this.props.classes.iconWrapper}>
          <Icon
            color={this.props.color}
            icon={this.props.icon}
            size={this.props.size}
            {...this.props.iconProps}
          />
        </div>
      </div>
    );
  }

  getClassName = () =>
    classnames(
      this.props.classes.root,
      {
        [this.props.classes.active]: this.props.isActive,
        [this.props.classes.disabled]: this.props.isDisabled,
      },
      this.props.className,
    );

  handleClick = e => {
    if (this.props.isDisabled) return;

    this.props.onClick(e);
  };
}

export default withStyles(styles)(IconButton);
