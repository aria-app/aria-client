import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import React from 'react';

const styles = (theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: transparentize(0.5, theme.palette.text.primary),
    border: `1px solid ${theme.palette.text.primary}`,
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 36,
    justifyContent: 'center',
    position: 'relative',
    transform: 'scale(1)',
    transition: 'transform 0.2s ease',
    width: 36,
    '&:hover:not(:active)': {
      backgroundColor: transparentize(0.6, theme.palette.text.primary),
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  plusHorizontal: {
    backgroundColor: theme.palette.text.primary,
    height: 1,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 9,
  },
  plusVertical: {
    backgroundColor: theme.palette.text.primary,
    height: 9,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1,
  },
});

// export interface TrackSequenceProps extends WithStyles<typeof styles> {
//   onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   style?: React.CSSProperties;
// }

function AddTrackButton(props) {
  const { classes, onClick, style } = props;

  return (
    <div className={classes.root} onClick={onClick} style={style}>
      <div className={classes.plusVertical} />
      <div className={classes.plusHorizontal} />
    </div>
  );
}

export default React.memo(withStyles(styles)(AddTrackButton));
