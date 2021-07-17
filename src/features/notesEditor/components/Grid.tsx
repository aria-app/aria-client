import { Box } from 'aria-ui';
import { FC, memo, useCallback, useRef } from 'react';
import reactFastCompare from 'react-fast-compare';

import { Dawww } from '../../../dawww';
import { Note, Point } from '../../../types';
import { Timeline } from '../../shared';
import { ToolType } from '../types';
import { DrawLayer } from './DrawLayer';
import { Notes } from './Notes';
import { Panner } from './Panner';
import { PositionIndicator } from './PositionIndicator';
import { Selector } from './Selector';
import { Slots } from './Slots';

export interface GridProps {
  measureCount?: number;
  mousePoint: Point;
  notes: Note[];
  notesEditorContentEl: HTMLElement | null;
  onDrag: (draggedNotes: Note[]) => void;
  onDragPreview: (draggedNotes: Note[]) => void;
  onDraw: (mousePoint: Point) => void;
  onErase: (noteToErase: Note) => void;
  onMousePointChange: (mousePoint: Point) => void;
  onResize: (resizedNotes: Note[]) => void;
  onSelect: (noteToSelect: Note, isAdditive: boolean) => void;
  onSelectInArea: (
    startPoint: Point,
    endPoint: Point,
    isAdditive: boolean,
  ) => void;
  selectedNotes: Note[];
  toolType: ToolType;
}

export const Grid: FC<GridProps> = memo((props) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    measureCount = 0,
    mousePoint,
    notes,
    notesEditorContentEl,
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

  const handleMouseLeave = useCallback(
    (e) => {
      onMousePointChange({ x: -1, y: -1 });
    },
    [onMousePointChange],
  );

  const handleMouseMove = useCallback(
    (e) => {
      const scrollLeftEl = e.currentTarget;
      const styleOffset = 80;
      const x = e.pageX || 0;
      const y = e.pageY - 56 || 0;
      const offsetLeft = scrollLeftEl.offsetLeft || 0;
      const offsetTop = scrollLeftEl.offsetTop || 0;
      const scrollLeft = scrollLeftEl.scrollLeft || 0;
      const scrollTop = notesEditorContentEl?.scrollTop || 0;

      const nextGridMousePoint = {
        x: Math.floor((x - offsetLeft + scrollLeft - styleOffset) / 40),
        y: Math.floor((y - offsetTop + scrollTop) / 40),
      };

      if (reactFastCompare(nextGridMousePoint, mousePoint)) return;

      onMousePointChange(nextGridMousePoint);
    },
    [notesEditorContentEl?.scrollTop, mousePoint, onMousePointChange],
  );

  return (
    <Box
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      paddingLeft={20}
      ref={ref}
      sx={{
        overflowX: 'scroll',
        overflowY: 'visible',
        position: 'relative',
      }}
    >
      <Box
        style={{
          width: measureCount * 4 * 8 * 40 + 80,
        }}
        sx={{
          height: '100%',
          overflowX: 'visible',
          position: 'relative',
        }}
      >
        <Slots
          measureCount={measureCount}
          octaveCount={Dawww.OCTAVE_RANGE.length}
        />
        {toolType === 'DRAW' && (
          <DrawLayer mousePoint={mousePoint} onDraw={onDraw} />
        )}
        <Selector
          isEnabled={toolType === 'SELECT'}
          onSelectInArea={onSelectInArea}
          scrollLeftEl={ref.current}
          scrollTopEl={notesEditorContentEl}
        />
        <Notes
          measureCount={measureCount}
          notes={notes}
          octaveCount={Dawww.OCTAVE_RANGE.length}
          onDrag={onDrag}
          onDragPreview={onDragPreview}
          onErase={onErase}
          onResize={onResize}
          onSelect={onSelect}
          selectedNotes={selectedNotes}
          toolType={toolType}
        />
        {toolType === 'PAN' && (
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
});

Grid.displayName = 'Grid';
