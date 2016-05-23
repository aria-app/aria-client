import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import './button.scss';

const component = ({
  className,
  onPress,
  text,
}) => h('.button', {
  className,
  onClick: () => onPress(),
}, text);

export const Button = compose([
  pure,
  setPropTypes({
    onPress: PropTypes.func,
    text: PropTypes.string,
  }),
])(component);
