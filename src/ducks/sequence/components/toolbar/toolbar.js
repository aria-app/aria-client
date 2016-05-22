import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import shared from 'ducks/shared';
import './toolbar.scss';

const { synthTypes, toolTypes } = shared.constants;

const component = ({
  synthButtons,
  toolButtons,
}) =>
  h('.toolbar', [
    ...toolButtons,
    h('.toolbar__right', [
      ...synthButtons,
    ]),
  ]);

const button = ({
  isActive,
  key,
  onPress,
  text,
}) => h('.toolbar__button', {
  className: classnames({
    'toolbar__button--active': isActive,
  }),
  key,
  onClick: () => onPress(text),
}, text);

export const Toolbar = compose([
  pure,
  setPropTypes({
    changeSynthType: PropTypes.func,
    setToolType: PropTypes.func,
    synthType: PropTypes.string,
    toolType: PropTypes.string,
  }),
  mapProps(({
    changeSynthType,
    setToolType,
    synthType,
    toolType,
    ...rest,
  }) => ({
    synthButtons: Object.keys(synthTypes).map((s, key) => h(button, {
      isActive: synthTypes[s] === synthType,
      onPress: changeSynthType,
      text: synthTypes[s],
      key,
    })),
    toolButtons: Object.keys(toolTypes).map((t, key) => h(button, {
      isActive: toolTypes[t] === toolType,
      onPress: setToolType,
      text: toolTypes[t],
      key,
    })),
    synthType,
    toolType,
    ...rest,
  })),
])(component);
