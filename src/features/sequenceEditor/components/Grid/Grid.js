import PropTypes from "prop-types";
import React from "react";
import { showIf } from "react-render-helpers";
import styled from "styled-components/macro";
import shared from "../../../shared";
import * as constants from "../../constants";
import { DrawLayer } from "../DrawLayer/DrawLayer";
import Notes from "../Notes/Notes";
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
    toolType: PropTypes.string
  };

  render() {
    return (
      <StyledGrid
        onMouseLeave={this.props.onMouseLeave}
        onMouseMove={this.props.onMouseMove}
        ref={this.setRef}
      >
        <GridWrapper style={this.getWrapperStyle()}>
          <Slots measureCount={this.props.measureCount} />
          {showIf(this.props.toolType === constants.toolTypes.DRAW)(
            <DrawLayer
              mousePoint={this.props.mousePoint}
              onDraw={this.props.onDraw}
            />
          )}
          <Selector
            isEnabled={this.props.toolType === constants.toolTypes.SELECT}
            mousePoint={this.props.mousePoint}
            notes={this.props.notes}
            onSelect={this.handleSelectorSelect}
            selectedNotes={this.props.selectedNotes}
          />
          <Notes
            measureCount={this.props.measureCount}
            notes={this.props.notes}
            onDrag={this.props.onDrag}
            onDragPreview={this.props.onDragPreview}
            onErase={this.props.onErase}
            onResize={this.props.onResize}
            onSelect={this.props.onSelect}
            selectedNotes={this.props.selectedNotes}
            toolType={this.props.toolType}
          />
          {showIf(this.props.toolType === constants.toolTypes.PAN)(
            <Panner
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

  handleSelectorSelect = (startPoint, isAdditive) =>
    this.props.onSelectInArea(startPoint, this.props.mousePoint, isAdditive);

  setRef = ref => {
    this.elementRef = ref;
  };
}
