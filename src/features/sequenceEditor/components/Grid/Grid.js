import isEqual from 'lodash/fp/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import shared from '../../../shared';
import { DrawLayer } from '../DrawLayer/DrawLayer';
import { Notes } from '../Notes/Notes';
import { Panner } from '../Panner/Panner';
import { Selector } from '../Selector/Selector';
import { Slots } from '../Slots/Slots';
import './Grid.scss';

const { Timeline } = shared.components;

export class Grid extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDrag: PropTypes.func.isRequired,
    onDragPreview: PropTypes.func.isRequired,
    onDraw: PropTypes.func.isRequired,
    onErase: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectInArea: PropTypes.func.isRequired,
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    sequenceEditorContentRef: PropTypes.object,
    toolType: PropTypes.string.isRequired,
  }

  state = {
    mousePoint: {
      x: -1,
      y: -1,
    },
  };

  render() {
    return (
      <div
        className="grid"
        onMouseMove={this.handleMouseMove}
        onWheel={this.handleWheel}
        ref={this.setRef}>
        <div
          className="grid__wrapper"
          style={this.getWrapperStyle()}>
          <Slots
            measureCount={this.props.measureCount}
          />
          <DrawLayer
            mousePoint={this.state.mousePoint}
            onDraw={this.props.onDraw}
            toolType={this.props.toolType}
          />
          <Selector
            mousePoint={this.state.mousePoint}
            notes={this.props.notes}
            onSelect={this.handleSelectorSelect}
            selectedNotes={this.props.selectedNotes}
            toolType={this.props.toolType}>
            <Notes
              measureCount={this.props.measureCount}
              mousePoint={this.state.mousePoint}
              notes={this.props.notes}
              onDrag={this.props.onDrag}
              onDragPreview={this.props.onDragPreview}
              onErase={this.props.onErase}
              onResize={this.props.onResize}
              onSelect={this.props.onSelect}
              selectedNotes={this.props.selectedNotes}
              toolType={this.props.toolType}
            />
          </Selector>
          <Panner
            onScrollLeftChange={this.handlePannerScrollLeftChange}
            onScrollTopChange={this.handlePannerScrollTopChange}
            scrollLeftEl={this.elementRef}
            scrollTopEl={this.props.sequenceEditorContentRef}
            toolType={this.props.toolType}
          />
          <Timeline
            isVisible={false}
            offset={0 * 40}
          />
        </div>
      </div>
    );
  }

  getWrapperStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? (this.props.measureCount * 4 * 8 * 40) + 80
        : 0,
    };
  }

  handleMouseMove = (e) => {
    const mousePoint = getMousePoint(
      e.currentTarget,
      this.props.sequenceEditorContentRef,
      e,
    );

    this.setState((state) => {
      if (isEqual(state.mousePoint, mousePoint)) return {};
      return { mousePoint };
    });
  }

  handlePannerScrollLeftChange = (scrollLeft) => {
    this.elementRef.scrollLeft = scrollLeft;
  };

  handlePannerScrollTopChange = (scrollTop) => {
    this.props.sequenceEditorContentRef.scrollTop = scrollTop;
  };

  handleSelectorSelect = (startPoint, isAdditive) =>
    this.props.onSelectInArea(startPoint, this.state.mousePoint, isAdditive);

  handleWheel = (e) => {
    const el = e.currentTarget;
    const maxX = el.scrollWidth - el.offsetWidth;

    if (el.scrollLeft + e.deltaX < 0 || el.scrollLeft + e.deltaX > maxX) {
      const scrollLeft = Math.max(0, Math.min(maxX, this.elementRef.scrollLeft + e.deltaX));

      e.preventDefault();

      this.elementRef.scrollLeft = scrollLeft;
    }
  };

  setRef = (ref) => {
    this.elementRef = ref;
  }
}

function getMousePoint(scrollLeftEl, scrollTopEl, e) {
  const styleOffset = 80;
  const x = e.pageX || 0;
  const y = e.pageY || 0;
  const offsetLeft = scrollLeftEl.offsetLeft || 0;
  const offsetTop = scrollLeftEl.offsetTop || 0;
  const scrollLeft = scrollLeftEl.scrollLeft || 0;
  const scrollTop = scrollTopEl.scrollTop || 0;

  return {
    x: toSlotNumber((x - offsetLeft) + scrollLeft - styleOffset),
    y: toSlotNumber((y - offsetTop) + scrollTop),
  };
}

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
