import isEqual from "lodash/fp/isEqual";
import PropTypes from "prop-types";
import React from "react";
import { showIf } from "react-render-helpers";
import styled from "styled-components/macro";
import shared from "../../../shared";
import * as constants from "../../constants";
import { DrawLayer } from "../DrawLayer/DrawLayer";
import { Notes } from "../Notes/Notes";
import { Panner } from "../Panner/Panner";
import { Selector } from "../Selector/Selector";
import { Slots } from "../Slots/Slots";

const { Timeline } = shared.components;

const GridWrapper = styled.div`
  height: 100%;
  overflow-x: visible;
  position: relative;
`;

const StyledGrid = styled.div`
  overflow-x: scroll;
  overflow-y: visible;
  padding-left: 80px;
  position: relative;
`;

export class Grid extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number,
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
    toolType: PropTypes.string.isRequired
  };

  state = {
    mousePoint: {
      x: -1,
      y: -1
    }
  };

  render() {
    return (
      <StyledGrid onMouseMove={this.handleMouseMove} ref={this.setRef}>
        <GridWrapper style={this.getWrapperStyle()}>
          <Slots measureCount={this.props.measureCount} />
          {showIf(this.props.toolType === constants.toolTypes.DRAW)(
            <DrawLayer
              mousePoint={this.state.mousePoint}
              onDraw={this.props.onDraw}
            />
          )}
          <Selector
            isEnabled={this.props.toolType === constants.toolTypes.SELECT}
            mousePoint={this.state.mousePoint}
            notes={this.props.notes}
            onSelect={this.handleSelectorSelect}
            selectedNotes={this.props.selectedNotes}
          >
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
          {showIf(this.props.toolType === constants.toolTypes.PAN)(
            <Panner
              onScrollLeftChange={this.handlePannerScrollLeftChange}
              onScrollTopChange={this.handlePannerScrollTopChange}
              scrollLeftEl={this.elementRef}
              scrollTopEl={this.props.sequenceEditorContentRef}
            />
          )}
          <Timeline isVisible={false} offset={0 * 40} />
        </GridWrapper>
      </StyledGrid>
    );
  }

  getWrapperStyle() {
    return {
      width:
        this.props.measureCount !== undefined
          ? this.props.measureCount * 4 * 8 * 40 + 80
          : 0
    };
  }

  handleMouseMove = e => {
    const mousePoint = getMousePoint(
      e.currentTarget,
      this.props.sequenceEditorContentRef,
      e
    );

    this.setState(state => {
      if (isEqual(state.mousePoint, mousePoint)) return {};
      return { mousePoint };
    });
  };

  handlePannerScrollLeftChange = scrollLeft => {
    this.elementRef.scrollLeft = scrollLeft;
  };

  handlePannerScrollTopChange = scrollTop => {
    this.props.sequenceEditorContentRef.scrollTop = scrollTop;
  };

  handleSelectorSelect = (startPoint, isAdditive) =>
    this.props.onSelectInArea(startPoint, this.state.mousePoint, isAdditive);

  setRef = ref => {
    this.elementRef = ref;
  };
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
    x: toSlotNumber(x - offsetLeft + scrollLeft - styleOffset),
    y: toSlotNumber(y - offsetTop + scrollTop)
  };
}

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
