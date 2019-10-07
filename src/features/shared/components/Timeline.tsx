import classnames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.text.primary,
      bottom: 0,
      left: 0,
      opacity: 0.25,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: 2,
    },
  });

export interface TimelineProps extends WithStyles<typeof styles> {
  className?: string;
  isVisible?: boolean;
  offset?: number;
  style?: React.CSSProperties;
}

function Timeline(props: TimelineProps) {
  const { className, classes, isVisible, offset, style = {}, ...rest } = props;

  if (!isVisible) return null;

  return (
    <div
      className={classnames(classes.root, className)}
      style={{ ...style, transform: `translateX(${offset}px)` }}
      {...rest}
    />
  );
}

export default React.memo(withStyles(styles)(Timeline));
