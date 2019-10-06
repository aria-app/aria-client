import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
    transform: 'scale(1)',
    transition: 'transform 0.2s ease',
  },
  icon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    height: 28,
    position: 'relative',
    width: 28,
    '&::after': {
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: theme.spacing(1),
      content: '""',
      display: 'block',
      height: 12,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 12,
    },
  },
  text: {
    color: theme.palette.primary.dark,
    fontWeight: 800,
    marginBottom: -3,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

TrackHeader.propTypes = {
  classes: PropTypes.object,
};

function TrackHeader(props) {
  const { children, classes, onClick } = props;

  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.icon} />
      <div className={classes.text}>{children}</div>
    </div>
  );
}

export default React.memo(withStyles(styles)(TrackHeader));
