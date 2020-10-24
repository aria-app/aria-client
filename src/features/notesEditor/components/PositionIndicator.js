import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import React from 'react';
import { showIf } from 'react-render-helpers';

const styles = (theme) => ({
  column: {
    backgroundColor: transparentize(0.95, theme.palette.primary.main),
    borderRadius: theme.shape.borderRadius,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 40,
  },
  row: {
    backgroundColor: transparentize(0.95, theme.palette.primary.main),
    borderRadius: theme.shape.borderRadius,
    left: 0,
    height: 40,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

// export interface PositionIndicatorProps extends WithStyles<typeof styles> {
//   mousePoint?: Point;
// }

function PositionIndicator(props) {
  const { classes, mousePoint } = props;

  return (
    <React.Fragment>
      {showIf(mousePoint.x >= 0)(
        <div
          className={classes.column}
          style={{
            transform: `translateX(${mousePoint.x * 40}px)`,
          }}
        />,
      )}
      {showIf(mousePoint.y >= 0)(
        <div
          className={classes.row}
          style={{
            transform: `translateY(${mousePoint.y * 40}px)`,
          }}
        />,
      )}
    </React.Fragment>
  );
}

export default React.memo(withStyles(styles)(PositionIndicator));
