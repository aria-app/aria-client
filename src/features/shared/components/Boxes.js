import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import Box from './Box';

const styles = {
  root: {
    position: 'relative',
  },
};

function Boxes(props) {
  const {
    boxContentComponent,
    classes,
    items,
    length = 0,
    onItemsChange,
    step = 100,
    style = {},
  } = props;

  const boxes = React.useMemo(() => items.filter(i => i.x < length), [
    items,
    length,
  ]);

  const handleBoxItemChange = React.useCallback(
    draggedItem => {
      onItemsChange(
        items.map(item => {
          if (item.id !== draggedItem.id) return item;

          return draggedItem;
        }),
      );
    },
    [items, onItemsChange],
  );

  return (
    <div
      className={classes.root}
      length={length}
      step={step}
      style={{ ...style, width: length * step }}
    >
      {boxes.map(item => (
        <Box
          contentComponent={boxContentComponent}
          key={item.id}
          onItemChange={handleBoxItemChange}
          step={step}
          item={item}
        />
      ))}
    </div>
  );
}

Boxes.propTypes = {
  boxContentComponent: PropTypes.func,
  classes: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      x: PropTypes.number,
      length: PropTypes.number,
    }),
  ),
  length: PropTypes.number,
  onItemsChange: PropTypes.func,
  step: PropTypes.number,
  style: PropTypes.object,
};

export default React.memo(withStyles(styles)(Boxes));
