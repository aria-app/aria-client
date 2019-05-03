import getOr from "lodash/fp/getOr";
import round from "lodash/round";
import times from "lodash/fp/times";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import shared from "../../../shared";
import { RulerResizer } from "../RulerResizer/RulerResizer";

const { MatrixBox } = shared.components;

const RulerMeasureNumber = styled.div({
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: 10,
  position: "absolute"
});

const StyledRuler = styled.div(props => ({
  cursor: "pointer",
  display: "flex",
  flex: "0 0 auto",
  height: 35,
  marginBottom: props.theme.margin.m,
  position: "relative"
}));

export class Ruler extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
    onMeasureCountChange: PropTypes.func.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    isStopped: PropTypes.bool.isRequired
  };

  render() {
    return (
      <StyledRuler
        onClick={this.handleClick}
        style={{
          width: this.getWidth()
        }}
      >
        <MatrixBox
          fill="white"
          height={35}
          matrix={this.getMatrix()}
          width={this.getWidth()}
        />
        {times(
          i => (
            <RulerMeasureNumber
              key={i}
              style={{
                left: i * 64 + 6,
                bottom: 0
              }}
            >
              {i + 1}
            </RulerMeasureNumber>
          ),
          this.props.measureCount
        )}
        <RulerResizer
          onSizeChange={this.props.onMeasureCountChange}
          size={this.props.measureCount}
        />
      </StyledRuler>
    );
  }

  getIsLastMeasure(measureIndex) {
    return measureIndex === this.props.measureCount;
  }

  getMatrix = () =>
    times(
      row =>
        times(column => {
          if (column === 0 || column % 8 === 0) {
            if (row === 0 || row === 4) {
              return 2;
            }
            return 1;
          }
          if (row === 0) {
            return 1;
          }
          return 0;
        }, this.props.measureCount * 8 + 1),
      5
    );

  getMeasuresStyle() {
    return {
      width: this.props.measureCount * this.props.measureWidth
    };
  }

  getWidth = () => this.props.measureWidth * this.props.measureCount + 1;

  handleClick = e => {
    if (this.props.isStopped) return;

    const offset = getOr(0, "nativeEvent.offsetX", e);
    const measures = offset / this.props.measureWidth;
    const notesPerMeasure = 32;

    this.props.onPositionSet(round(measures * notesPerMeasure));
  };
}
