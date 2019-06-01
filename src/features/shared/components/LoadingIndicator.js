import withStyles from '@material-ui/styles/withStyles';
import React from 'react';

const styles = {
  root: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
};

function LoadingIndicator(props) {
  const { children, classes, ...rest } = props;

  return (
    <div className={classes.root} {...rest}>
      {children}
    </div>
  );
}

export default React.memo(withStyles(styles)(LoadingIndicator));
