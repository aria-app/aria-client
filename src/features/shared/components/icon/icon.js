import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import icons from './icons';
import './icon.scss';

const component = props => h('.icon', {
  className: props.className,
}, [
  h('.icon__content', [
    h(props.iconComponent, {
      size: getSizePixels(props.size),
    }),
  ]),
]);

export const Icon = compose(
  pure,
  setPropTypes({
    icon: PropTypes.string,
    size: PropTypes.oneOf([
      'small',
      'regular',
      'large',
    ]),
  }),
  mapProps(props => ({
    ...props,
    iconComponent: loadIcon(props.icon),
  })),
)(component);

function loadIcon(name) {
  const icon = icons[name];

  if (!icon) {
    throw new Error(`No icon exists for name ${name}`);
  }

  return icon;
}

function getSizePixels(size) {
  switch (size) {
    case 'large':
      return 24;
    case 'small':
      return 12;
    default:
      return 20;
  }
}
