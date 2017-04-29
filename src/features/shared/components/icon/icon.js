import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { showIf } from '../../helpers';
import icons from './icons';
import './icon.scss';

export class Icon extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.oneOf(Object.keys(icons).concat([''])),
    size: React.PropTypes.oneOf(['small', 'regular', 'large', '']),
    style: StylePropType,
  }

  render() {
    return h('.icon', {
      className: this.props.className,
      style: this.props.style,
    }, [
      h('.icon__content', [
        showIf(!!this.loadIcon())(
          h(this.loadIcon(), {
            size: this.getSizePixels(),
          }),
        ),
      ]),
    ]);
  }

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
