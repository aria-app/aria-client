import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import React from 'react';
import { Point } from '../../../types';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: transparentize(0.75, theme.palette.primary.main),
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 2,
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    },
  });

export interface FenceProps extends WithStyles<typeof styles> {
  endPoint?: Point;
  startPoint?: Point;
}

function Fence(props: FenceProps) {
  const { classes, endPoint, startPoint } = props;

  const display = React.useMemo(
    () =>
      !isEmpty(startPoint) && !isEqual(startPoint, endPoint) ? 'block' : 'none',
    [endPoint, startPoint],
  );

  const height = React.useMemo(() => {
    if (isEmpty(startPoint) || isEmpty(endPoint)) return 0;

    return (Math.abs(endPoint.y - startPoint.y) + 1) * 40;
  }, [endPoint, startPoint]);

  const transform = React.useMemo(() => {
    if (isEmpty(startPoint) || isEmpty(endPoint)) {
      return 'translate(0px, 0px)';
    }

    const x = Math.min(startPoint.x, endPoint.x) * 40;
    const y = Math.min(startPoint.y, endPoint.y) * 40;

    return `translate(${x}px, ${y}px)`;
  }, [endPoint, startPoint]);

  const width = React.useMemo(() => {
    if (isEmpty(startPoint) || isEmpty(endPoint)) return 0;

    return (Math.abs(endPoint.x - startPoint.x) + 1) * 40;
  }, [endPoint, startPoint]);

  return (
    <div
      className={classes.root}
      style={{ display, height, transform, width }}
    />
  );
}

export default React.memo(withStyles(styles)(Fence));
