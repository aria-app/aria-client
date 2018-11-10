import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import icons from './icons';
import './Icon.scss';

export class Icon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
    style: PropTypes.object,
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.props.style}>
        <div
          className="icon__content">
          {showIf(this.loadIcon())(
            React.createElement(this.loadIcon(), {
              size: this.getSizePixels(),
            }),
          )}
        </div>
      </div>
    );
  }

  getClassName = () =>
    classnames('icon', this.props.className);

  getSizePixels() {
    switch (this.props.size) {
      case 'large':
        return 24;
      case 'small':
        return 12;
      default:
        return 20;
    }
  }

  loadIcon() {
    return icons[this.props.icon] || '';
  }
}
