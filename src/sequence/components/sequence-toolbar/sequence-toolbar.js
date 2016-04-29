import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import sound from 'sound';
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
    requestSetSynth: PropTypes.func,
    requestSetTool: PropTypes.func,
    synth: PropTypes.string,
    tool: PropTypes.string,
  }),
  mapProps(({
    requestSetSynth,
    requestSetTool,
    synth,
    tool,
    ...rest,
  }) => ({
    synthButtons: Object.keys(synthTypes).map((synthType, key) => h(button, {
      isActive: synthTypes[synthType] === synth,
      onPress: requestSetSynth,
      text: synthTypes[synthType],
      key,
    })),
    toolButtons: Object.keys(toolTypes).map((toolType, key) => h(button, {
      isActive: toolTypes[toolType] === tool,
      onPress: requestSetTool,
      text: toolTypes[toolType],
      key,
    })),
    synth,
    tool,
    ...rest,
  })),
  pure,
])(component);
