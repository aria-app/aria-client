import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import icons from './icons';
import './icon.scss';

export class Icon extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'regular', 'large']),
    style: StylePropType,
  }

  render() {
    return h('.icon', {
      className: this.props.className,
    }, [
      h('.icon__content', [
        h(this.loadIcon(), {
          size: this.getSizePixels(),
        }),
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
    const icon = icons[this.props.icon];

    if (!icon) {
      throw new Error(`No icon exists for name ${this.props.icon}`);
    }

    return icon;
  }
}
