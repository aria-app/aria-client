import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import { toolTypes } from '../../constants';
import sound from 'sound';
import './sequence-toolbar.scss';

const { synthTypes } = sound.constants;
const { getType } = sound.model;

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
    currentSynth: PropTypes.object,
    currentTool: PropTypes.string,
  }),
  mapProps(({
    requestSetSynth,
    requestSetTool,
    currentSynth,
    currentTool,
    ...rest,
  }) => ({
    synthButtons: Object.keys(synthTypes).map((synth, index) => button({
      key: index,
      className: classnames(),
      isActive: synthTypes[synth] === getType(currentSynth),
      onPress: requestSetSynth,
      text: synthTypes[synth],
    })),
    toolButtons: Object.keys(toolTypes).map((tool, index) => button({
      key: index,
      isActive: toolTypes[tool] === currentTool,
      onPress: requestSetTool,
      text: toolTypes[tool],
    })),
    currentSynth,
    currentTool,
    ...rest,
  })),
  pure,
])(component);
