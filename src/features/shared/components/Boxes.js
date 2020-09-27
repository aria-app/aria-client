import classnames from 'classnames';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import Box from './Box';

const styles = createStyles({
  root: {
    position: 'relative',
  },
});

// export interface BoxesProps extends WithStyles<typeof styles> {
//   boxContentComponent?: React.ElementType;
//   className?: string;
//   items?: Array<BoxItem>;
//   length?: number;
//   onItemsChange?: (items: Array<BoxItem>) => void;
//   step?: number;
//   style?: React.CSSProperties;
// }

function Boxes(props) {
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

  const boxes = React.useMemo(() => items.filter(i => i.x < length), [
    items,
    length,
  ]);

  const handleBoxItemChange = React.useCallback(
    draggedItem => {
      if (!onItemsChange) return;

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
      className={classnames(classes.root, className)}
      style={{ ...style, width: length * step }}
    >
      {boxes.map(item => (
        <Box
          contentComponent={boxContentComponent}
          key={item.id}
          onItemChange={handleBoxItemChange}
          item={item}
          step={step}
          totalLength={length}
        />
      ))}
    </div>
  );
}

export default React.memo(withStyles(styles)(Boxes));
