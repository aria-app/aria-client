import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 64,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    transition: 'transform 200ms ease',
    width: 64,
  },
  button: {
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
    },
  },
  icon: {
    fill: theme.palette.primary.light,
    '$button:hover &': {
      fill: theme.palette.primary.main,
    },
  },
});

function AddSequenceButton(props) {
  const { classes, onClick, position } = props;

  const handleClick = React.useCallback(() => {
    onClick(position);
  }, [onClick, position]);

  return (
    <div
      className={classes.root}
      onClick={handleClick}
      style={{ transform: `translateX(${position * 64}px)` }}
    >
      <Fab className={classes.button} size="small">
        <AddIcon className={classes.icon} />
      </Fab>
    </div>
  );
}

AddSequenceButton.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  position: PropTypes.number,
};

export default React.memo(withStyles(styles)(AddSequenceButton));
