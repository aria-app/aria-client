import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, pure, setPropTypes } from 'recompose';
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
  pure,
  setPropTypes({
    className: PropTypes.string,
    isActive: PropTypes.bool,
    onPress: PropTypes.func,
    text: PropTypes.string,
  }),
)(component);
