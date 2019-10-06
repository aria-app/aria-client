import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 84,
    justifyContent: 'center',
    position: 'absolute',
    width: 64,
  },
  plusHorizontal: {
    backgroundColor: theme.palette.primary.contrastText,
    height: 1,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 9,
  },
  plusVertical: {
    backgroundColor: theme.palette.primary.contrastText,
    height: 9,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1,
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
      style={{ left: position * 64 }}
    >
      <Fab className="classes.button" color="primary" size="small">
        <div className={classes.plusVertical} />
        <div className={classes.plusHorizontal} />
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
