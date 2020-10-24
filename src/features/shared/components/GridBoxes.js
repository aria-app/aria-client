import withStyles from '@material-ui/styles/withStyles';
import classnames from 'classnames';
import React from 'react';

import GridBox from './GridBox';

const styles = {
  root: {
    position: 'relative',
  },
};

// export interface GridBoxesProps extends WithStyles<typeof styles> {
//   boxContentComponent?: React.ElementType;
//   className?: string;
//   items?: Array<GridBoxItem>;
//   length?: number;
//   onItemsChange?: (items: Array<GridBoxItem>) => void;
//   step?: number;
//   style?: React.CSSProperties;
// }

function GridBoxes(props) {
  const {
    boxContentComponent,
    className,
    classes,
    items = [],
    length = 0,
    onItemsChange,
    step = 100,
    style = {},
  } = props;

  const boxes = React.useMemo(() => items.filter((i) => i.x < length), [
    items,
    length,
  ]);

  const handleGridBoxItemChange = React.useCallback(
    (draggedItem) => {
      if (!onItemsChange) return;

      onItemsChange(
        items.map((item) => {
          if (item.id !== draggedItem.id) return item;

          return draggedItem;
        }),
      );
    },
    [items, onItemsChange],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      style={{ ...style, width: length * step }}
    >
      {boxes.map((item) => (
        <GridBox
          contentComponent={boxContentComponent}
          key={item.id}
          onItemChange={handleGridBoxItemChange}
          item={item}
          step={step}
          totalLength={length}
        />
      ))}
    </div>
  );
}

export default React.memo(withStyles(styles)(GridBoxes));
