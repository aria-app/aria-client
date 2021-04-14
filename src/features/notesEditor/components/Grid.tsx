import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import * as constants from '../constants';
import DrawLayer from './DrawLayer';
import Notes from './Notes';
import Panner from './Panner';
import PositionIndicator from './PositionIndicator';
import Selector from './Selector';
import Slots from './Slots';

const { Box, Timeline } = shared.components;

Grid.propTypes = {
  measureCount: PropTypes.number,
  mousePoint: PropTypes.object,
  notes: PropTypes.arrayOf(PropTypes.object),
  notesEditorContentEl: PropTypes.object,
  onDrag: PropTypes.func,
  onDragPreview: PropTypes.func,
  onDraw: PropTypes.func,
  onErase: PropTypes.func,
  onMousePointChange: PropTypes.func,
  onResize: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectInArea: PropTypes.func,
  selectedNotes: PropTypes.arrayOf(PropTypes.object),
  toolType: PropTypes.string,
};

function Grid(props: any) {
  const ref = React.useRef();
  const {
    measureCount,
    mousePoint,
    notes,
    notesEditorContentEl = {},
    onDrag,
    onDragPreview,
    onDraw,
    onErase,
    onMousePointChange,
    onResize,
    onSelect,
    onSelectInArea,
    selectedNotes,
    toolType,
  } = props;

  const handleMouseLeave = React.useCallback(
    (e) => {
      onMousePointChange({ x: -1, y: -1 });
    },
    [onMousePointChange],
  );

  const handleMouseMove = React.useCallback(
    (e) => {
      const scrollLeftEl = e.currentTarget;
      const styleOffset = 80;
      const x = e.pageX || 0;
      const y = e.pageY - 56 || 0;
      const offsetLeft = scrollLeftEl.offsetLeft || 0;
      const offsetTop = scrollLeftEl.offsetTop || 0;
      const scrollLeft = scrollLeftEl.scrollLeft || 0;
      const scrollTop = notesEditorContentEl.scrollTop || 0;

      const nextGridMousePoint = {
        x: Math.floor((x - offsetLeft + scrollLeft - styleOffset) / 40),
        y: Math.floor((y - offsetTop + scrollTop) / 40),
      };

      onMousePointChange(nextGridMousePoint);
    },
    [onMousePointChange, notesEditorContentEl.scrollTop],
  );

  return (
    <Box
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={ref}
      sx={{
        overflowX: 'scroll',
        overflowY: 'visible',
        paddingLeft: 20,
        position: 'relative',
      }}
    >
      <Box
        style={{
          width:
            measureCount !== undefined ? measureCount * 4 * 8 * 40 + 80 : 0,
        }}
        sx={{
          height: '100%',
          overflowX: 'visible',
          position: 'relative',
        }}
      >
        <Slots measureCount={measureCount} />
        {toolType === constants.toolTypes.DRAW && (
          <DrawLayer mousePoint={mousePoint} onDraw={onDraw} />
        )}
        <Selector
          isEnabled={toolType === constants.toolTypes.SELECT}
          onSelect={onSelectInArea}
          scrollLeftEl={ref.current}
          scrollTopEl={notesEditorContentEl}
        />
        <Notes
          measureCount={measureCount}
          notes={notes}
          onDrag={onDrag}
          onDragPreview={onDragPreview}
          onErase={onErase}
          onResize={onResize}
          onSelect={onSelect}
          selectedNotes={selectedNotes}
          toolType={toolType}
        />
        {toolType === constants.toolTypes.PAN && (
          <Panner
            scrollLeftEl={ref.current}
            scrollTopEl={notesEditorContentEl}
          />
        )}
        <PositionIndicator mousePoint={mousePoint} />
        <Timeline isVisible={false} offset={0 * 40} />
      </Box>
    </Box>
  );
}

export default React.memo(Grid);
