import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
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

const styles = {
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
};

function Grid(props) {
  const ref = React.useRef();
  const {
    classes,
    measureCount,
    mousePoint,
    notes,
    onDrag,
    onDragPreview,
    onDraw,
    onErase,
    onMouseLeave,
    onMouseMove,
    onResize,
    onSelect,
    onSelectInArea,
    selectedNotes,
    sequenceEditorContentRef,
    toolType,
  } = props;

  return (
    <div
      className={classes.root}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
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
          scrollTopEl={sequenceEditorContentRef}
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
            scrollTopEl={sequenceEditorContentRef}
          />,
        )}
        <PositionIndicator mousePoint={mousePoint} />
        <Timeline isVisible={false} offset={0 * 40} />
      </div>
    </div>
  );
}

Grid.propTypes = {
  measureCount: PropTypes.number,
  mousePoint: PropTypes.object,
  notes: PropTypes.arrayOf(PropTypes.object),
  onDrag: PropTypes.func,
  onDragPreview: PropTypes.func,
  onDraw: PropTypes.func,
  onErase: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onResize: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectInArea: PropTypes.func,
  selectedNotes: PropTypes.arrayOf(PropTypes.object),
  sequenceEditorContentRef: PropTypes.object,
  toolType: PropTypes.string,
};

export default React.memo(withStyles(styles)(Grid));
