import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import { showIf } from 'react-render-helpers';

import shared from '../../shared';
import * as constants from '../constants';
import DrawLayer from './DrawLayer';
import Notes from './Notes';
import Panner from './Panner';
import PositionIndicator from './PositionIndicator';
import Selector from './Selector';
import Slots from './Slots';

const { Timeline } = shared.components;

const styles = createStyles({
  root: {
    overflowX: 'scroll',
    overflowY: 'visible',
    paddingLeft: 80,
    position: 'relative',
  },
  wrapper: {
    height: '100%',
    overflowX: 'visible',
    position: 'relative',
  },
});

// export interface GridProps extends WithStyles<typeof styles> {
//   measureCount?: number;
//   mousePoint?: Point;
//   notes?: Array<Note>;
//   notesEditorContentEl?: HTMLElement;
//   onDrag?: (notes: Array<Note>) => void;
//   onDragPreview?: (notes: Array<Note>) => void;
//   onDraw?: (startingPoint: Point) => void;
//   onErase?: (note: Note) => void;
//   onMousePointChange?: (mousePoint: Point) => void;
//   onResize?: (resizedNotes: Array<Note>) => void;
//   onSelect?: (note: Note, isAdditive: boolean) => void;
//   onSelectInArea?: (
//     startPoint: Point,
//     endPoint: Point,
//     isAdditive: boolean,
//   ) => void;
//   selectedNotes?: Array<Note>;
//   toolType?: string;
// }

function Grid(props) {
  const ref = React.useRef();
  const {
    classes,
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
    <div
      className={classes.root}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      <div
        className={classes.wrapper}
        style={{
          width:
            measureCount !== undefined ? measureCount * 4 * 8 * 40 + 80 : 0,
        }}
      >
        <Slots measureCount={measureCount} />
        {showIf(toolType === constants.toolTypes.DRAW)(
          <DrawLayer mousePoint={mousePoint} onDraw={onDraw} />,
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
        {showIf(toolType === constants.toolTypes.PAN)(
          <Panner
            scrollLeftEl={ref.current}
            scrollTopEl={notesEditorContentEl}
          />,
        )}
        <PositionIndicator mousePoint={mousePoint} />
        <Timeline isVisible={false} offset={0 * 40} />
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(Grid));
