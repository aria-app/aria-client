import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
  root: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.background.paper,
    // borderTop: `1px solid ${theme.palette.divider}`,
    // boxShadow: theme.shadows[1],
    display: 'flex',
    flex: '0 0 auto',
    height: 56,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: 'relative',
  },
  leftItems: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
  },
  rightItems: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    marginLeft: 'auto',
  },
});

function Toolbar(props) {
  const {
    className,
    classes,
    isAlternate,
    leftItems,
    leftItemsAlt,
    rightItems,
    rightItemsAlt,
    ...rest
  } = props;

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <div className={classes.leftItems}>
        {isAlternate ? leftItemsAlt : leftItems}
      </div>
      <div className={classes.rightItems}>
        {isAlternate ? rightItemsAlt : rightItems}
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  isAlternate: PropTypes.bool,
  leftItems: PropTypes.node,
  leftItemsAlt: PropTypes.node,
  rightItems: PropTypes.node,
  rightItemsAlt: PropTypes.node,
};

export default React.memo(withStyles(styles)(Toolbar));
