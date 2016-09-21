import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import './toolbar.scss';

const component = props =>
  h('.toolbar', {
    className: classnames(props.modifierClasses, props.className),
  }, [
    h('.toolbar__left', [
      ...props.leftItems,
    ]),
    h('.toolbar__right', [
      ...props.rightItems,
    ]),
  ]);

export const Toolbar = compose(
  pure,
  setPropTypes({
    alternateLeftItems: PropTypes.array,
    alternateRightItems: PropTypes.array,
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.array,
    position: PropTypes.oneOf([
      'top',
      'bottom',
    ]),
    rightItems: PropTypes.array,
  }),
  mapProps(props => ({
    ...props,
    leftItems: getLeftItems(props),
    rightItems: getRightItems(props),
    modifierClasses: getModifierClasses(props),
  })),
)(component);

function getLeftItems({ alternateLeftItems, isAlternate, leftItems }) {
  if (isAlternate) {
    return alternateLeftItems || [];
  }

  return leftItems || [];
}

function getRightItems({ alternateRightItems, isAlternate, rightItems }) {
  if (isAlternate) {
    return alternateRightItems || [];
  }

  return rightItems || [];
}

function getModifierClasses({ isAlternate, position }) {
  return classnames({
    'toolbar--bottom': position === 'bottom',
    'toolbar--top': position !== 'bottom',
    'toolbar--alternate': isAlternate,
  });
}
