import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: transparentize(0.5, theme.palette.primary.main),
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 84,
    justifyContent: 'center',
    position: 'absolute',
    width: 64,
  },
  plusHorizontal: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 9,
  },
  plusVertical: {
    backgroundColor: theme.palette.primary.main,
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
      style={{
        left: position * 64,
      }}
    >
      <div className={classes.plusVertical} />
      <div className={classes.plusHorizontal} />
    </div>
  );
}

AddSequenceButton.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  position: PropTypes.number,
};

export default React.memo(withStyles(styles)(AddSequenceButton));
