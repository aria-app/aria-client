import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, pure, setDisplayName, setPropTypes } from 'recompose';
import './toggle-button.scss';

const component = ({
  className,
  isActive,
  onPress,
  text,
}) => h('.toggle-button', {
  className: classnames({
    'toggle-button--active': isActive,
  }, className),
  onClick: () => onPress(),
}, text);

export const ToggleButton = compose(
  setDisplayName('ToggleButton'),
  pure,
  setPropTypes({
    className: PropTypes.string,
    isActive: PropTypes.bool,
    onPress: PropTypes.func,
    text: PropTypes.string,
  }),
)(component);
