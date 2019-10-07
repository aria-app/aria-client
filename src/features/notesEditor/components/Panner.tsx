import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  root: {
    bottom: 0,
    cursor: 'grab',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  panning: {
    cursor: 'grabbing',
  },
};

function Panner(props) {
  const { classes, scrollLeftEl, scrollTopEl } = props;
  const [startPoint, setStartPoint] = React.useState();

  const handleMouseDown = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();

      setStartPoint({
        scrollLeft: scrollLeftEl.scrollLeft,
        scrollTop: scrollTopEl.scrollTop,
        x: e.pageX,
        y: e.pageY,
      });
    },
    [scrollLeftEl.scrollLeft, scrollTopEl.scrollTop],
  );

  const handleMouseLeave = React.useCallback(() => {
    if (!startPoint) return;

    setStartPoint(null);
  }, [startPoint]);

  const handleMouseMove = React.useCallback(
    e => {
      if (!startPoint) return;

      const dx = e.pageX - startPoint.x;
      const dy = e.pageY - startPoint.y;
      const scrollLeft = startPoint.scrollLeft - dx;
      const scrollTop = startPoint.scrollTop - dy;

      scrollLeftEl.scrollLeft = scrollLeft;
      scrollTopEl.scrollTop = scrollTop;
    },
    [scrollLeftEl.scrollLeft, scrollTopEl.scrollTop, startPoint],
  );

  const handleMouseUp = React.useCallback(() => {
    if (!startPoint) return;

    setStartPoint(null);
  }, [startPoint]);

  return (
    <div
      className={classnames(classes.root, {
        [classes.panning]: !!startPoint,
      })}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

Panner.propTypes = {
  classes: PropTypes.object,
  scrollLeftEl: PropTypes.object,
  scrollTopEl: PropTypes.object,
};

export default React.memo(withStyles(styles)(Panner));
