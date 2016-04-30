import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import sound from 'modules/sound';
import { toolTypes } from '../../constants';
import './sequence-toolbar.scss';

const { synthTypes } = sound.constants;

const component = ({
  synthButtons,
  toolButtons,
}) =>
  h('.sequence-toolbar', [
    ...toolButtons,
    h('.sequence-toolbar__right', [
      ...synthButtons,
    ]),
  ]);

const button = ({
  isActive,
  key,
  onPress,
  text,
}) => h('.sequence-toolbar__button', {
  className: classnames({
    'sequence-toolbar__button--active': isActive,
  }),
  key,
  onClick: () => onPress(text),
}, text);

export const SequenceToolbar = compose([
  setPropTypes({
    changeSynthType: PropTypes.func,
    requestSetTool: PropTypes.func,
    synthType: PropTypes.string,
    tool: PropTypes.string,
  }),
  mapProps(({
    changeSynthType,
    requestSetTool,
    synthType,
    tool,
    ...rest,
  }) => ({
    synthButtons: Object.keys(synthTypes).map((s, key) => h(button, {
      isActive: synthTypes[s] === synthType,
      onPress: changeSynthType,
      text: synthTypes[s],
      key,
    })),
    toolButtons: Object.keys(toolTypes).map((t, key) => h(button, {
      isActive: toolTypes[t] === tool,
      onPress: requestSetTool,
      text: toolTypes[t],
      key,
    })),
    synthType,
    tool,
    ...rest,
  })),
  pure,
])(component);
