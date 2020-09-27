import classnames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      bottom: 0,
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column' as const,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '@global': {
      '*': {
        margin: 0,
        outline: 'none' as const,
        padding: 0,
        boxSizing: 'border-box' as const,
        WebkitFocusRingColor: 'transparent' as const,
        WebkitTapHighlightColor: 'transparent' as const,
        WebkitTouchCallout: 'none' as const,
        WebkitUserSelect: 'none' as const,
        KhtmlUserSelect: 'none' as const,
        MozUserSelect: 'none' as const,
        MsUserSelect: 'none' as const,
        userSelect: 'none' as const,
      },
      'html, body': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
      },
      body: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
      },
      '::-webkit-scrollbar': {
        display: 'none',
      },
    },
  });

export interface ShellProps
  extends WithStyles<typeof styles>,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

function Shell(props: ShellProps) {
  const { className, classes, ...rest } = props;

  return <div className={classnames(classes.root, className)} {...rest} />;
}

export default React.memo(withStyles(styles)(Shell));
