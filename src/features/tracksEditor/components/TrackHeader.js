import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    fontWeight: 800,
    height: 28,
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    transform: 'scale(1)',
    transition: 'transform 0.2s ease',
    '&:hover:not(:active)': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
});

TrackHeader.propTypes = {
  classes: PropTypes.object,
};

function TrackHeader(props) {
  const { classes, ...rest } = props;

  return <div className={classes.root} {...rest} />;
}

export default React.memo(withStyles(styles)(TrackHeader));
