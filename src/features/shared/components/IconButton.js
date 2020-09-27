import classnames from 'classnames';
import noop from 'lodash/fp/noop';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import Icon from './Icon';

const styles = (theme) =>
  createStyles({
    root: {
      alignItems: 'stretch',
      cursor: 'pointer',
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
      height: 40,
      position: 'relative',
      transform: 'scale(1)',
      transition: 'transform 200ms ease',
      width: 40,
      '&:hover': {
        transform: 'scale(1.2)',
      },
      '&:active': {
        transform: 'scale(0.9)',
      },
    },
    background: {
      flex: '1 0 auto',
    },
    iconWrapper: {
      position: 'absolute',
    },
    active: {
      '&:hover': {
        transform: 'none',
      },
      '&:active': {
        transform: 'none',
      },
      '& $background': {
        backgroundColor: theme.palette.action.selected,
      },
    },
    disabled: {
      cursor: 'not-allowed',
      '&:hover': {
        transform: 'none',
      },
      '&:active': {
        transform: 'none',
      },
      '& $iconWrapper': {
        opacity: 0.5,
      },
    },
  });

// export interface IconButtonProps extends WithStyles<typeof styles> {
//   className?: string;
//   color?: string;
//   icon?: string;
//   iconProps?: object;
//   isActive?: boolean;
//   isDisabled?: boolean;
//   onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   size?: 'small' | 'regular' | 'large' | '';
//   style?: object;
//   title?: string;
// }

function IconButton(props) {
  const {
    className,
    classes,
    color,
    icon,
    iconProps = {},
    isActive,
    isDisabled,
    onClick,
    size,
    style,
    title,
  } = props;

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.active]: isActive,
          [classes.disabled]: isDisabled,
        },
        className,
      )}
      onClick={isDisabled ? noop : onClick}
      style={style}
      title={title}
    >
      <div className={classes.background} />
      <div className={classes.iconWrapper}>
        <Icon color={color} icon={icon} size={size} {...iconProps} />
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(IconButton));
