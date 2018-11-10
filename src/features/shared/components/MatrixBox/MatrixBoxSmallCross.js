import React from 'react';
import './MatrixBoxSmallCross.scss';

export const MatrixBoxSmallCross = props => (
  <div
    className="matrix-box-small-cross"
    style={{
      transform: props.style.transform,
    }}>
    <div
      className="matrix-box-small-cross__horizontal-bar"
      style={{
        backgroundColor: props.style.backgroundColor,
        opacity: props.style.opacity,
      }}>

    </div>
    <div
      className="matrix-box-small-cross__vertical-bar"
      style={{
        backgroundColor: props.style.backgroundColor,
        opacity: props.style.opacity,
      }}
    />
  </div>
);
