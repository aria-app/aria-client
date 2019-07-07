import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
import icons from './icons';

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
});

class Icon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.string,
    icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
    theme: PropTypes.object,
  };

  render() {
    const {
      className,
      classes,
      color,
      icon,
      size,
      theme,
      ...rest
    } = this.props;

    return (
      <div
        className={classnames(classes.root, className)}
        color={color}
        {...rest}
      >
        <div className={classes.content}>{this.getIcon()}</div>
      </div>
    );
  }

  getIcon(theme) {
    const color =
      this.props.color ||
      (this.props.theme && this.props.theme.palette.text.primary);
    const iconComponent = icons[this.props.icon];

    if (!iconComponent) return null;

    return React.createElement(iconComponent, {
      color,
      size: this.getSizePixels(),
    });
  }

  getSizePixels() {
    switch (this.props.size) {
      case 'large':
        return 24;
      case 'small':
        return 12;
      default:
        return 20;
    }
  }
}

export default withTheme(withStyles(styles)(Icon));
