import PropTypes from "prop-types";
import React, { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components/macro";

const StyledRulerResizer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid white;
  cursor: col-resize;
  height: 32px;
  left: 0;
  position: absolute;
  top: 3px;
  transition: box-shadow 250ms ease, opacity 500ms ease, transform 350ms ease;
  width: 24px;
  &:hover:not(:active) {
    background-color: rgba(255, 255, 255, 0.6);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.4);
  }
  :after {
    border-left: 2px dotted white;
    border-right: 2px dotted white;
    content: "";
    display: block;
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
  }
  ${props =>
    props.isDragging
      ? `
      box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.25);
      opacity: 0.80;
      transform: translateY(-4px) scale(1.05);
      transition: box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease;`
      : ""}
`;

RulerResizer.propTypes = {
  size: PropTypes.number.isRequired
};

export function RulerResizer(props) {
  const [isDragging, setIsDragging] = useState(false);

  const getPosition = () => ({
    x: props.size * 64 + 16,
    y: 0
  });

  const handleDrag = (e, dragData) => {
    props.onSizeChange(
      Math.max(1, props.size + Math.round(dragData.deltaX / 64))
    );
  };

  return (
    <Draggable
      axis="x"
      bounds={{
        left: 64 - 16
      }}
      grid={[64, 0]}
      onDrag={handleDrag}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
      position={getPosition()}
    >
      <span style={{ position: "absolute" }}>
        <StyledRulerResizer isDragging={isDragging} />
      </span>
    </Draggable>
  );
}
