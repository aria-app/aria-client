import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './toolbar.scss';

const component = ({
  leftItems,
  rightItems,
}) =>
  h('.toolbar', [
    ...leftItems,
    h('.toolbar__right', [
      ...rightItems,
    ]),
  ]);

export const Toolbar = compose([
  pure,
  setPropTypes({
    leftItems: PropTypes.array,
    rightItems: PropTypes.array,
  }),
  mapProps(props => ({
    leftItems: props.leftItems || [],
    rightItems: props.rightItems || [],
  })),
])(component);
