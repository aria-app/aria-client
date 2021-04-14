import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import GridBox from './GridBox';

const Root = styled.div({
  position: 'relative',
});

GridBoxes.propTypes = {
  boxContentComponent: PropTypes.elementType,
  items: PropTypes.arrayOf(PropTypes.object),
  length: PropTypes.number,
  onItemsChange: PropTypes.func,
  step: PropTypes.number,
};

function GridBoxes(props: any) {
  const {
    boxContentComponent,
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
    <Root style={{ ...style, width: length * step }}>
      {boxes.map((item) => (
        <GridBox
          contentComponent={boxContentComponent}
          item={item}
          key={item.id}
          onItemChange={handleGridBoxItemChange}
          step={step}
          totalLength={length}
        />
      ))}
    </Root>
  );
}

export default React.memo(GridBoxes);
