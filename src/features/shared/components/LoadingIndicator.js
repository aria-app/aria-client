import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';

const styles = createStyles({
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
});

// export interface LoadingIndicatorProps extends WithStyles<typeof styles> {
//   children?: React.ReactNode;
// }

function LoadingIndicator(props) {
  const { children, classes } = props;

  return <div className={classes.root}>{children}</div>;
}

export default React.memo(withStyles(styles)(LoadingIndicator));
