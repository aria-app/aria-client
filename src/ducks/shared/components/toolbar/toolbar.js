import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './toolbar.scss';

const component = ({
  className,
  leftItems,
  positionClass,
  rightItems,
}) =>
  h('.toolbar', {
    className: classnames(className, positionClass),
  }, [
    ...leftItems,
    h('.toolbar__right', [
      ...rightItems,
    ]),
  ]);

export const Toolbar = compose([
  pure,
  setPropTypes({
    leftItems: PropTypes.array,
    position: PropTypes.oneOf([
      'top',
      'bottom',
    ]),
    rightItems: PropTypes.array,
  }),
  mapProps(props => ({
    ...props,
    leftItems: props.leftItems || [],
    rightItems: props.rightItems || [],
    positionClass: getPositionClass(props.position),
  })),
])(component);

function getPositionClass(position) {
  switch (position) {
    case 'bottom':
      return 'toolbar--bottom';
    default:
      return 'toolbar--top';
  }
}
