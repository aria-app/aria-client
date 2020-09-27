import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import classnames from 'classnames';
import React from 'react';

const styles = (theme) =>
  createStyles({
    root: {
      alignItems: 'stretch',
      backgroundColor: theme.palette.background.paper,
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

// export interface ToolbarProps extends WithStyles<typeof styles> {
//   className?: string;
//   isAlternate?: boolean;
//   leftItems?: React.ReactNode;
//   leftItemsAlt?: React.ReactNode;
//   rightItems?: React.ReactNode;
//   rightItemsAlt?: React.ReactNode;
// }

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

export default React.memo(withStyles(styles)(Toolbar));
