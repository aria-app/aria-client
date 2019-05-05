import PropTypes from "prop-types";
import React from "react";
import { showIf } from "react-render-helpers";
import styled from "styled-components/macro";
import shared from "../../shared";
import * as constants from "../constants";
import DrawLayer from "./DrawLayer";
import Notes from "./Notes";
import Panner from "./Panner";
import PositionIndicator from "./PositionIndicator";
import Selector from "./Selector";
import Slots from "./Slots";

const { Timeline } = shared.components;

const GridWrapper = styled.div({
  height: "100%",
  overflowX: "visible",
  position: "relative",
});

const StyledGrid = styled.div({
  overflowX: "scroll",
  overflowY: "visible",
  paddingLeft: 80,
  position: "relative",
});

export default class Grid extends React.PureComponent {
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
    toolType: PropTypes.string,
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
            />,
          )}
          <Selector
            isEnabled={this.props.toolType === constants.toolTypes.SELECT}
            onSelect={this.props.onSelectInArea}
            scrollLeftEl={this.elementRef}
            scrollTopEl={this.props.sequenceEditorContentRef}
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
            />,
          )}
          <PositionIndicator mousePoint={this.props.mousePoint} />
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
          : 0,
    };
  }

  setRef = ref => {
    this.elementRef = ref;
  };
}
