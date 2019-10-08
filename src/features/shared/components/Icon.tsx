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
    height: theme.spacing(5),
    justifyContent: 'center',
    width: theme.spacing(5),
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    height: theme.spacing(3),
    justifyContent: 'center',
    width: theme.spacing(3),
  },
});

function Icon(props) {
  const { className, classes, color, icon, size, theme, ...rest } = props;

  const IconComponent = icons[icon];

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <div className={classes.content}>
        <IconComponent
          color={color || (theme && theme.palette.action.active)}
          size={
            { large: theme.spacing(3), small: theme.spacing(1.5) }[size] ||
            theme.spacing(2.5)
          }
        />
      </div>
    </div>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
  size: PropTypes.oneOf(['small', 'regular', 'large', '']),
  theme: PropTypes.object,
};

export default React.memo(withTheme(withStyles(styles)(Icon)));
