import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, pure, setPropTypes } from 'recompose';
import { Icon } from '../icon/icon';
import './icon-button.scss';

const component = props => h('.icon-button', {
  className: classnames({
    'icon-button--active': props.isActive,
  }, props.className),
  onClick: props.onPress,
  title: props.toolTip,
}, [
  h('.icon-button__background'),
  h(Icon, {
    className: 'icon-button__icon',
    icon: props.icon,
  }),
]);

export const IconButton = compose(
  pure,
  setPropTypes({
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onPress: PropTypes.func,
    toolTip: PropTypes.string,
  }),
)(component);
