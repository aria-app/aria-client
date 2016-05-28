import _ from 'lodash';
import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import * as FAIcons from 'react-icons/lib/fa';
import './icon.scss';

const component = ({
  className,
  iconComponent,
  size,
}) => h('.icon', {
  className,
}, [
  h('.icon__content', [
    h(iconComponent, {
      size: getSizePixels(size),
    }),
  ]),
]);

export const Icon = compose([
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
])(component);

function loadIcon(name) {
  const moduleName = `Fa${_.startCase(name).replace(/\s/g, '')}`;
  const icon = FAIcons[moduleName];

  if (!icon) {
    throw new Error(`No icon exists for name ${moduleName}`);
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
