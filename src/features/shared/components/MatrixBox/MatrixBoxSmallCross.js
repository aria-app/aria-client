import h from 'react-hyperscript';
import './MatrixBoxSmallCross.scss';

export const MatrixBoxSmallCross = props =>
  h('.matrix-box-small-cross', {
    style: {
      transform: props.style.transform,
    },
  }, [
    h('.matrix-box-small-cross__horizontal-bar', {
      style: {
        backgroundColor: props.style.backgroundColor,
        opacity: props.style.opacity,
      },
    }),
    h('.matrix-box-small-cross__vertical-bar', {
      style: {
        backgroundColor: props.style.backgroundColor,
        opacity: props.style.opacity,
      },
    }),
  ]);
