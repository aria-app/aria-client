import getOr from 'lodash/fp/getOr';
import round from 'lodash/round';
import times from 'lodash/fp/times';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components/macro';
import shared from '../../../shared';

const { MatrixBox } = shared.components;

const RulerMeasureNumber = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  position: absolute;
`;

const RulerResizer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid white;
  height: 36px;
  left: 0;
  position: absolute;
  top: 0;
  width: 36px;
`;

const StyledRuler = styled.div`
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 35px;
  margin-bottom: ${props => props.theme.margin.m}px;
  position: relative;
`;

export class Ruler extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    isStopped: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <StyledRuler
        onClick={this.handleClick}
        style={{
          width: this.getWidth(),
        }}>
        <MatrixBox
          fill="white"
          height={35}
          matrix={this.getMatrix()}
          width={this.getWidth()}
        />
        {times(i => (
          <RulerMeasureNumber
            key={i}
            style={{
              left: (i * 64) + 6,
              bottom: 0,
            }}>
            {i + 1}
          </RulerMeasureNumber>
        ), this.props.measureCount)}
        <Draggable
          axis="x"
          bounds={{
            left: 64 - 16,
          }}
          grid={[64, 0]}
          onDrag={this.handleResizerDrag}
          position={this.getResizerPosition()}>
          <RulerResizer/>
        </Draggable>
      </StyledRuler>
    );
  }

  getIsLastMeasure(measureIndex) {
    return measureIndex === this.props.measureCount;
  }

  getMatrix = () =>
    times(
      row => times(
        (column) => {
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
        },
        (this.props.measureCount * 8) + 1,
      ),
      5,
    );

  getMeasuresStyle() {
    return {
      width: this.props.measureCount * this.props.measureWidth,
    };
  }

  getResizerPosition = () => ({
    x: (this.props.measureCount * 64) + 16,
    y: 0,
  });

  getWidth = () =>
    (this.props.measureWidth * this.props.measureCount) + 1;

  handleClick = (e) => {
    if (this.props.isStopped) return;

    const offset = getOr(0, 'nativeEvent.offsetX', e);
    const measures = offset / this.props.measureWidth;
    const notesPerMeasure = 32;

    this.props.onPositionSet(round(measures * notesPerMeasure));
  };

  handleResizerDrag = (e, position) => {
    this.props.onMeasureCountChange(
      Math.max(1, this.props.measureCount + (position.deltaX / 64)),
    );
  };
}
